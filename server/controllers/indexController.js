const cron = require('node-cron')
const firebase = require('firebase');
const firebaseApp = firebase.initializeApp({
  databaseURL: 'https://werefox-hacktiv8.firebaseio.com',
  projectId: 'werefox-hacktiv8'
})
const db = firebaseApp.database()

const Rooms = db.ref('rooms')

//milisecond
const PHASE_DAY = 4 * 60 * 1000
const PHASE_VOTE = 1 * 60 * 1000

module.exports = {
  createRoom: (req, res) => {
    console.log('new room');
    let newRoomKey = Rooms.push().key
    Rooms.child(newRoomKey).set({
      phase: false,
      day: 0,
      start: false,
      over: false,
      member: {
        [req.headers.userVerified.id]: {
          role: null,
          alive: true,
          roomMaster: true
        }
      },
      chatPublic: {},
      chatWerewolf: {}
    })

    console.log('sent id back to client', newRoomKey);
    res.send({roomId: newRoomKey})
  },

  startRoom: (req, res) => {
    Rooms.child(req.body.roomKey).child('member').once('value')
    .then(snapshot => {
      let members = Object.keys(snapshot.val())
      let werefox = Math.floor(members.length * / 4) == 0 ? 1 : Math.floor(members.length * / 4)

      while (members.length > 0) {
        let rand = Math.floor(Math.random() * members.length)
        if (werefox > 0) {
          Rooms.child(req.body.roomKey).child('member').child(members[rand]).child('role').set('werefox')
          members.splice(rand, 1)
          werefox--
        } else {
          Rooms.child(req.body.roomKey).child('member').child(members[rand]).child('role').set('villager')
          members.splice(rand, 1)
        }
      }

      Rooms.child(req.body.roomKey).child('start').set(true)
      //langsung masuk siang hari
      day(req.body.roomKey)
    })
  }
}

function checkWin(roomKey, cb) {
  //win or lanjut
  Rooms.child(roomKey).child('member').once('value')
  .then(snapshot => {
    let members = Object.keys(snapshot.val())
    let werefox = members.filter((member, index) => members[member].role == 'werefox' && members[member].alive == true)
    let villager = members.filter((member, index) => members[member].role == 'villager' && members[member].alive == true)

    if (werefox.length == 0) {
      Rooms.child(roomKey).child('over').set(true)
      Rooms.child(roomKey).child('winner').set('villager')
    } else if (villager.length == 0) {
      Rooms.child(roomKey).child('over').set(true)
      Rooms.child(roomKey).child('winner').set('werewolf')
    } else {
      cb(roomKey)
    }
  })
}

function day(roomKeyy) {
  checkWin(roomKeyy, roomKey => {
    Rooms.child(roomKey).child('day').once('value')
    .then(snapshot => {
      Rooms.child(roomKey).child('day').set(snapshot.val() + 1) //increment day count
      Rooms.child(roomKey).child('phase').set('day') //jadi siang hari

      let now = new Date()
      let due = new Date(now.getTime() + PHASE_DAY)
      let cronTime = `${due.getSeconds()} ${due.getMinutes()} ${due.getHours()} ${due.getDate()} ${due.getMonth() + 1} *`
      cron.schedule(cronTime, function(){
        //siang udah selesai saatnya vote
        vote(roomKey)
      })
    })
  })
}

function vote(roomKey) {
  Rooms.child(roomKey).child('phase').set('vote')

  let now = new Date()
  let due = new Date(now.getTime() + PHASE_VOTE)
  let cronTime = `${due.getSeconds()} ${due.getMinutes()} ${due.getHours()} ${due.getDate()} ${due.getMonth() + 1} *`
  cron.schedule(cronTime, function(){
    //periksa vote siang
    Rooms.child(roomKey).child('dayVotes').once('value')
    .then(snapshot => {
      let votesObj = snapshot.val()

      //sort vote tertinggi [[id, voteCount], ...]
      let votesArr = []
      for (var key in votesObj)
        votesArr.push([key, votesObj[key]])
      votesArr.sort((a, b) => b[1] - a[1])

      //death or draw
      if (votesArr[0][1] == votesArr[1][1]) {
        //game draw
        Rooms.child(roomKey).child('voteDayResult').set({
          status: 'draw'
        })

      } else {
        //votesArr[0] mati
        Rooms.child(roomKey).child('voteDayResult').set({
          status: 'dead',
          who: votesArr[0][0]
        })
        Rooms.child(roomKey).child('member').child(votesArr[0][0]).child('alive').set(false)
      }
    })

    //vote udah selesai saatnya night
    night(roomKey)
  })
}

function night(roomKeyy) {
  checkWin(roomKeyy, roomKey => {
    Rooms.child(roomKey).child('phase').set('night')
    Rooms.child(roomKey).child('member').once('value')
    .then(snapshot => {
      let members = Object.keys(snapshot.val())
      let werefox = members.filter((member, index) => members[member].role == 'werefox' && members[member].alive == true)

      Rooms.child(roomKey).child('voteNightResult').on('value')
      .then(nightVotes => {
        let votesObj = nightVotes.val()
        let voteCount = 0
        for (var key in votesObj)
          voteCount += votesObj[key]

        if (voteCount == werefox.length) {
          //stop listening
          Rooms.child(roomKey).child('voteNightResult').off()

          let votesArr = []
          for (var key in votesObj)
            votesArr.push([key, votesObj[key]])
          votesArr.sort((a, b) => b[1] - a[1])

          //siapa yang mati
          if (votesArr[0][1] == votesArr[1][1]) {
            //game draw
            Rooms.child(roomKey).child('voteNightResult').set({
              status: 'draw'
            })

          } else {
            //votesArr[0] mati
            Rooms.child(roomKey).child('voteNightResult').set({
              status: 'dead',
              who: votesArr[0][0]
            })
            Rooms.child(roomKey).child('member').child(votesArr[0][0]).child('alive').set(false)
          }

          day(roomKey)
        }
      })
    })
  })
}
