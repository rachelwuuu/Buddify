const db = require('./firestoreDb')
const _ = require('lodash')

const users = db.collection('users')

module.exports.accountVerify = async (email, uid) => {
    const snapshot = await users.get();
    let pass = false
    // console.log(email, '=>', uid);
    snapshot.forEach((doc) => {
        if (doc.id == email && doc.data().uid == uid) {
            pass = true
        }
    })
    return pass
}

module.exports.accountInfo = async email => {

    const snapshot = await users.get();
    let accounts = []
    snapshot.forEach((doc) => {
        const data = doc.data()
        // console.log(doc.id, '=>', data);
        accounts.push({email: data.email, name: data.name, avatar: data.avatar, intro: data.intro, keywords: data.keywords, friendList: data.friends})
    })

    let results = accounts
    if (email) {
        results = _.find(accounts, {email})
    }

    if (results && results.length > 0) {
        results.forEach((v, i)=>{
            let friendEmails = v.friendList
            if (friendEmails)
                v.friends = _.filter(accounts, account => friendEmails.includes(account.email))
        })
    } else if (results) {
        let friendEmails = results.friendList
        if (friendEmails)
            results.friends = _.filter(accounts, account => friendEmails.includes(account.email))
    }
    console.log(results)
    
    return results
}

module.exports.accountUpdate = async (email, data) => {

}