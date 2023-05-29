
const API_KEY = "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";

const submitButton = document.getElementById("submit");
const output = document.getElementById("output");
const inputBox =document.querySelector('input');
const history = document.querySelector(".history")
const buttonElement = document.querySelector("button")

function changeInput(value) {
    const input = document.querySelector("input")
    input.value = value
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: inputBox.value}],
        max_tokens: 2000
    })
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json()
    output.textContent = data.choices[0].message.content
    if(data.choices[0].message.content) {
        const pElement = document.createElement('p')
        pElement.textContent = inputBox.value
        pElement.addEventListener("click", ()=>changeInput(inputBox.value))
        history.append(pElement)
        output.style.opacity = 1
    }
  } catch (error) {
    console.log(error)
  }
}

function clearInput() {
    inputBox.value = ''
}

submitButton.addEventListener("click", getMessage);
inputBox.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        getMessage()
    }
})
buttonElement.addEventListener('click', clearInput)
