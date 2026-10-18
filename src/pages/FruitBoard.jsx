import { useState } from 'react'
import { Button, Table, Form, Alert } from 'react-bootstrap'

// 과일농장 게시판 : useState + 화면 모드 플래그(listOk/readOk/writeOk/editOk)로 CRUD 구현
const FruitBoard = () => {
  const [boardList, setBoardList] = useState([
    { no: '1', title: '사과는 언제 배송이 되나요?', description: '어제부터 기다렸는데 아직 배송이 안됐어요.', viewCount: 1 },
    { no: '2', title: '수박크기가 작아요', description: '수박이 맛있고 달았습니다. 하지만 수박크기는 많이 작았어요. ', viewCount: 2 },
    { no: '3', title: '오렌지 당도가 낮아요', description: '당도가 11birx이상은 아닌것같아요.', viewCount: 1 },
    { no: '4', title: '딸기향이 이상해요', description: '딸기에서 흙냄새가 납니다.', viewCount: 1 },
  ])

  // 화면 모드
  const [listOk, setListOk] = useState(true)
  const [readOk, setReadOk] = useState(false)
  const [writeOk, setWriteOk] = useState(false)
  const [editOk, setEditOk] = useState(false)
  const [boardInfo, setBoardInfo] = useState({}) // 읽기 화면에 보여줄 게시글

  // 작성 폼
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // 수정 폼
  const [editNo, setEditNo] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // 한 화면만 true로
  const showOnly = (mode) => {
    setListOk(mode === 'list')
    setReadOk(mode === 'read')
    setWriteOk(mode === 'write')
    setEditOk(mode === 'edit')
  }
  const boardListView = () => showOnly('list')

  // 읽기 + 조회수 증가
  const boardRead = (no) => {
    showOnly('read')
    setBoardList(boardList.map((b) => (b.no === no ? { ...b, viewCount: b.viewCount + 1 } : b)))
    setBoardInfo(boardList.find((b) => b.no === no))
  }

  const boardWrite = () => {
    setErrorMessage('')
    showOnly('write')
  }

  // 등록
  const boardSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      setErrorMessage('제목과 내용을 모두 입력해주세요!')
      return
    }
    // 삭제 후에도 번호가 겹치지 않도록 최대 번호 + 1
    const nextNo = String(Math.max(0, ...boardList.map((b) => Number(b.no))) + 1)
    setBoardList([...boardList, { no: nextNo, title, description, viewCount: 0 }])
    setTitle('')
    setDescription('')
    setErrorMessage('')
    boardListView()
  }

  // 삭제 : filter
  const boardDelete = (no) => {
    setBoardList(boardList.filter((b) => b.no !== no.toString()))
    boardListView()
  }

  // 수정 폼 열기 : 기존 값으로 폼 채우기
  const boardEdit = (no) => {
    showOnly('edit')
    const b = boardList.find((x) => x.no === no)
    setEditNo(b.no)
    setEditTitle(b.title)
    setEditDescription(b.description)
  }

  // 수정 저장 : map
  const updateBoard = () => {
    setBoardList(
      boardList.map((b) => (b.no === editNo ? { ...b, title: editTitle, description: editDescription } : b)),
    )
    boardListView()
  }

  return (
    <div className="container" style={{ marginTop: '80px' }}>
      <h3>과일농장 게시판</h3>

      {listOk && (
        <div style={{ marginTop: '30px' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>문의글</th>
                <th>조회수</th>
                <th>문의하기</th>
              </tr>
            </thead>
            <tbody>
              {/* 최신 글이 위로 오게 reverse */}
              {boardList
                .slice()
                .reverse()
                .map((board) => (
                  <tr key={board.no}>
                    <td>{board.no}</td>
                    <td style={{ cursor: 'pointer', textAlign: 'left' }} onClick={() => boardRead(board.no)}>
                      {board.title}
                    </td>
                    <td style={{ cursor: 'pointer', textAlign: 'left' }} onClick={() => boardRead(board.no)}>
                      {board.description}
                    </td>
                    <td>{board.viewCount}</td>
                    <td>
                      <Button variant="outline-primary" onClick={() => boardRead(board.no)}>게시글읽기</Button>
                      <Button variant="outline-success" onClick={() => boardEdit(board.no)} style={{ marginLeft: '10px' }}>수정</Button>
                      <Button variant="outline-danger" onClick={() => boardDelete(board.no)} style={{ marginLeft: '10px' }}>삭제</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={boardWrite} style={{ float: 'right' }}>문의글 작성하기</Button>
        </div>
      )}

      {readOk && (
        <div>
          <h5 style={{ textAlign: 'left' }}>{boardInfo.title}</h5>
          <hr />
          <p style={{ textAlign: 'left' }}>{boardInfo.description}</p>
          <br />
          <div style={{ textAlign: 'right' }}>
            <Button variant="secondary" onClick={boardListView}>목록으로</Button>
          </div>
        </div>
      )}

      {writeOk && (
        <div style={{ marginTop: '30px' }}>
          <h5 style={{ textAlign: 'left' }}>과일농장에게 문의글 남기기</h5>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group controlId="formName">
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="게시글을 입력하세요" />
          </Form.Group>
          <Form.Group controlId="formDescription" style={{ marginTop: '30px' }}>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="게시물에 작성하세요" />
          </Form.Group>
          <br />
          <div style={{ textAlign: 'right' }}>
            <Button variant="primary" onClick={boardSave} style={{ marginRight: '10px' }}>저장</Button>
            <Button variant="secondary" onClick={boardListView}>목록으로</Button>
          </div>
        </div>
      )}

      {editOk && (
        <div style={{ marginTop: '30px' }}>
          <h5 style={{ textAlign: 'left' }}>게시물 수정</h5>
          <Form.Group controlId="formEditName">
            <Form.Control type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="수정된 제목" />
          </Form.Group>
          <br />
          <Form.Group controlId="formEditDescription">
            <Form.Control as="textarea" rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="수정된 설명" />
          </Form.Group>
          <br />
          <div style={{ textAlign: 'right' }}>
            <Button variant="outline-success" onClick={updateBoard} style={{ marginRight: '10px' }}>수정</Button>
            <Button variant="outline-info" onClick={boardListView}>목록으로</Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default FruitBoard
