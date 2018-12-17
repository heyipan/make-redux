/* 2 与 1 的 区别  通过添加‘监听’ 修改后可以不需要每次重新调用renderApp*/



/*需要渲染的数据*/
const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}
/*渲染  参数表示要渲染的 数据 或者 状态 */
function renderApp (appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}
/*渲染title*/
function renderTitle (title) {
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}
/*渲染content*/
function renderContent (content) {
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}
/*修改数据的方法或者是要修改那些数据*/
function stateChanger (state,action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}
/*将上面的方法整合在一起 返回一个对象 包含获取数据 和 改变数据的方法*/
/*state 表示初始状态或者初始数据  stateChanger方法表示 通过action怎么修改state(状态或者数据)*/
/*function createStore (state, stateChanger) {
    const getState = () => state; /!*得到当前的状态 或者数据*!/
    const dispatch = (action) => stateChanger(state, action);/!*修改当前的状态或者数据*!/
    return { getState, dispatch }/!*返回一个对象  可以调用这两个方法*!/
}*/

/*改进*/
function createStore (state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)//添加‘监听’ 为了改变数据（状态）后自动调用‘监听函数’ 这里是为了自动调用renderApp方法
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}

const store = createStore(appState, stateChanger);
store.subscribe(() => renderApp(store.getState())); // 监听数据变化  传入一个函数  这个函数表示  数据或者状态修改后要做到动作或者要调用的方法

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(store.getState()) // 把新的数据渲染到页面上

