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
/*渲染*/
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
function dispatch (action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
            break
        default:
            break
    }
}

dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
renderApp(appState)