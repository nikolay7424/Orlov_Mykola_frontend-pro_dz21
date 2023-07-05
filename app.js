const submit = document.querySelector('input[type=submit]')
const table = document.getElementById('table')
const form = document.getElementById('form')
const radioElements = Array.from(form.querySelectorAll('input[type=radio]'))
const checkboxElements = Array.from(form.querySelectorAll('input[type=checkbox]'))

function submitHandler(e) {
    e.preventDefault()
    table.innerHTML = ''
    let radioChecked = false
    let radioCounter = 0
    let citySelected = false
    let knownLanguages = []
    let checkboxCounter = 0
    for(let i = 0; i < form.elements.length - 1; i++) {
        switch(form.elements[i].type) {
            case('text') :
                if(form.elements[i].value !== '') {
                    createTableRow(form.elements[i].name, form.elements[i].value, table)
                } else {
                    createTableRow(form.elements[i].name, 'unknown', table)
                }
                break
            case('radio') :
                if(form.elements[i].checked === true) {
                    radioChecked = true
                    radioCounter++
                    createTableRow(form.elements[i].name, form.elements[i].value, table)
                } else {
                    radioCounter++
                    if(radioCounter === radioElements.length && radioChecked === false) {
                        createTableRow(form.elements[i].name, 'unknown', table)    
                    }   
                }
                break
            case('select-one') :
                Array.from(form.elements[i].options).forEach(option => {
                    if(option.value !== '' && option.selected) {
                        citySelected = true
                        createTableRow(form.elements[i].name, option.value, table)    
                    }
                })
                if(citySelected) {
                    continue
                } else {
                    createTableRow(form.elements[i].name, 'unknown', table)    
                }
                break
            case('textarea') : 
                if(form.elements[i].value !== '') {
                    createTableRow(form.elements[i].name, form.elements[i].value, table)
                } else {
                    createTableRow(form.elements[i].name, 'unknown', table)
                }
                break
            case('checkbox') : 
                if(form.elements[i].checked) {
                    knownLanguages.push(form.elements[i].previousElementSibling.textContent.toLowerCase()
                    )
                    checkboxCounter++
                } else {
                    checkboxCounter++
                }
                if(checkboxCounter === checkboxElements.length) {
                    if(knownLanguages.length === 0) {
                        createTableRow('languages', 'unknown', table)
                    } else {
                        createTableRow('languages', knownLanguages.join(' '), table)
                    }
                    continue
                }
                break
        }
    }
}

function createTableRow(key, value, appendTo) {
    const tr = document.createElement('tr')
    const tdKey = document.createElement('td')
    tdKey.textContent = key
    const tdValue = document.createElement('td')
    tdValue.textContent = value
    tr.appendChild(tdKey)
    tr.appendChild(tdValue)
    appendTo.appendChild(tr)
}

submit.addEventListener('click', submitHandler)