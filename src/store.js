import { configureStore, createSlice } from '@reduxjs/toolkit'

// 장바구니 상태
let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 1, imgurl: 'fruit1.jpg', name: '수박', count: 2 },
    { id: 2, imgurl: 'fruit2.jpg', name: '참외', count: 1 },
    { id: 3, imgurl: 'fruit3.jpg', name: '사과', count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      state.find((a) => a.id === action.payload).count++
    },
    decreaseCount(state, action) {
      let item = state.find((a) => a.id === action.payload)
      if (item.count > 0) item.count--
      else alert('상품이 더 이상 없습니다.')
    },
    // 이미 있으면 수량 +1, 없으면 새로 추가
    addItem(state, action) {
      let item = state.find((a) => a.id === action.payload.id)
      if (item) item.count++
      else state.push(action.payload)
    },
    deleteItem(state, action) {
      return state.filter((a) => a.id !== action.payload)
    },
    sortName(state) {
      state.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
})

export let { addCount, decreaseCount, addItem, deleteItem, sortName } = cart.actions

export default configureStore({
  reducer: { cart: cart.reducer },
})
