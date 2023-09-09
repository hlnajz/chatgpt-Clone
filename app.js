// Do NOT deploy this API key or upload onto GitHub

const API_KEY = ""; // YOUR API_KEY
const submitBtn = document.querySelector("#submit");
const clearBtn = document.getElementById("clear");
const outputElement = document.getElementById("output");
const render = document.getElementById("render");
const historyField = document.querySelector(".history");

function changeInput(value) {
  const render = document.getElementById("render");
  render.value = value;
}
async function getMsg() {
  console.log("Done");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: render.value }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);

    if (data.choices && data.choices[0] && data.choices[0].message.content) {
      outputElement.textContent = data.choices[0].message.content;
      const pElement = document.createElement("p");
      pElement.textContent = render.value;
      pElement.addEventListener("click", () => changeInput(render.value));
      historyField.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
}
submitBtn.addEventListener("click", getMsg);

function clearInput() {
  clearBtn.value = "";
}

clearBtn.addEventListener("click", clearInput);
