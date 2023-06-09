import { jwtInstance } from "../apiConfig"

// 프로필 조회
const getProfile = async () => {
  try {
    const response = await jwtInstance.get('/members/mypage')
    // console.log("response : ", response)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 프로필 수정
const addProfile = async (file) => {
  try {
    const response = await jwtInstance.put('/members/mypage', file)
    return response
  } catch (error) {
    console.log(error)
  }
}

// 친구 목록 조회
const getFriendList = async () => {
  try {
    const response = await jwtInstance.get('/friendship/requests/accepted')
    // console.log("response : ", response)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 친구요청 목록 조회 (누가 나한테 친구 신청 했는지..)
const getFriendRequestList = async () => {
  try {
    const response = await jwtInstance.get('/friendship/requests/pending')
    // console.log("response : ", response)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 친구 신청 수락/거절
const reciveFriendRequest = async (target) => {
  //{"requestSenderNickname": String,"determineRequest": boolean}
  // console.log("장미의 선택은..?", target)
  try {
    const response = await jwtInstance.post('/friendship/requests/determine', target)
    return response
  } catch (error) {
    console.log(error)
  }
}

// 친구 삭제
const deleteFriend = async (targetFriend) => {
  // console.log("너랑 절교다!!", targetFriend)
  const target = { receiverNickname: targetFriend }

  try {
    const response = await jwtInstance.post('/friendship/requests/delete', target)
    return response
  } catch (error) {
    console.log(error)
  }
}

// 친구 요청
const requestFriend = async (targetFriend) => {
  const target = { requestReceiverNickname: targetFriend }
  try {
    const response = await jwtInstance.post('/friendship/requests', target)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 유저 프로필 조회
const getUserProfile = async (memberId) => {
  try {
    const response = await jwtInstance.get('/members/' + memberId)
    // console.log("getUserProfile response : ", response.data.message)
    // console.log("getUserProfile response : ", response.data.data)
    if (response.data.message === '프로필 조회 성공') {
      return Promise.resolve(response)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

// githubID 등록
const githubIdPost = async (id) => {
  try {
    const response = await jwtInstance.post('/members/github', { 'githubId': id })
    return response
  } catch (error) {
    console.log(error)
  }
}

// 친구 찾기
const searchUser = async (param) => {
  console.log("param",param)
  const urlMaker = () => {
    let url = '/members/search/'
    if(param.type === 'NAME'){
      return url + 'nickname?nickname=' +  param.value
    }else if (param.type === 'CODE'){
      return url + 'friend-code?friendCode=' + param.value
    }
  }

  try {
    const response = await jwtInstance.get(urlMaker())
    //console.log('사용자 조회 결과',response.data)
    if (response.data.message === '멤버 검색 성공') {
      return Promise.resolve(response)
    }else{
      return Promise.reject(response)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

// 받은쪽지조회
const receiveMessage = async () => {
  try {
    const response = await jwtInstance.get('/directMessage/received')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 보낸쪽지조회
const sentMessage = async () => {
  try {
    const response = await jwtInstance.get('/directMessage/sent')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 쪽지쓰기
const postMessage = async (message) => {
  try {
    const response = await jwtInstance.post('/directMessage/send', message)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

// 쪽지삭제
const deleteMessage = async (messages) => {
  try {
    const response = await jwtInstance.post('/directMessage/delete', {'directMessageList' : messages})
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}
export { 
  getProfile, 
  addProfile, 
  getFriendList,
  getFriendRequestList, 
  reciveFriendRequest, 
  deleteFriend, 
  getUserProfile, 
  requestFriend, 
  githubIdPost, 
  searchUser,
  receiveMessage,
  postMessage,
  sentMessage,
  deleteMessage
}