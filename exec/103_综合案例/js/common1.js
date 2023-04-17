const uname = document.querySelector('.uname')
const age = document.querySelector('.age')
const gender = document.querySelector('.gender')
const salary = document.querySelector('.salary')
const city = document.querySelector('.city')
const add = document.querySelector('.add')
const tbody = document.querySelector('tbody')
const formName = document.querySelectorAll('.info [name]')

const arr = JSON.parse(localStorage.getItem('arr')) || []

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
render()

const info = document.querySelector('.info')
info.addEventListener('submit', function(e) {
    e.preventDefault()
    for(let i = 0; i < formName.length; i++) {
    if(trim(formName[i].value) === '') {
        return alert('输入内容不能为空')
    }
    }
    const timeNow = new Date()
    const yy = timeNow.getFullYear()
    const mm = timeNow.getMonth() + 1
    const dd = timeNow.getDate()
    const h = timeNow.getHours() < 10 ? '0' + timeNow.getHours() : timeNow.getHours()
    const m = timeNow.getMinutes() < 10 ? '0' + timeNow.getMinutes() : timeNow.getMinutes()
    const s = timeNow.getSeconds() < 10 ? '0' + timeNow.getSeconds() : timeNow.getSeconds()
    const obj = {
        stuId: arr.length ? +arr[arr.length - 1].stuId + 1 : 1,
        uname: uname.value,
        age: age.value,
        gender: gender.value,
        salary: salary.value,
        city: city.value,
        time: `${yy}/${mm}/${dd} ${h}:${m}:${s}`
    }
    arr.push(obj)
    localStorage.setItem('arr', JSON.stringify(arr))
    this.reset()
    render()
})

function render() {
    if(tbody.innerHTML) {
        tbody.innerHTML = ''
    }
    if(arr.length) {
        const trArr = arr.map(function(ele, index) {
            return `
                <tr>
                    <td>${ele.stuId}</td>
                    <td>${ele.uname}</td>
                    <td>${ele.age}</td>
                    <td>${ele.gender}</td>
                    <td>${ele.salary}</td>
                    <td>${ele.city}</td>
                    <td>${ele.time}</td>
                    <td>
                    <a href="javascript:" data-id=${index}>
                        <i class="iconfont icon-shanchu"></i>
                        删除
                    </a>
                    </td>
                </tr>
            `
        })
        tbody.innerHTML = trArr.join('')
        document.querySelector('.title span').innerHTML = arr.length
    }
}

tbody.addEventListener('click', function(e) {
    if(e.target.tagName === 'A') {
    arr.splice(e.target.dataset.id, 1)
    localStorage.setItem('arr', JSON.stringify(arr))
    render()
    }
})