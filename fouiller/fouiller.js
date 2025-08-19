 for (let i = 0; i < 50; i++) {
      let star = document.createElement("div");
      star.classList.add("stars");
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      document.body.appendChild(star);
    }

     function checkCode() {
      const code = document.getElementById("codeInput").value;
      const feedback = document.getElementById("feedback");
      if(code === "1994") {
        window.location.href = "../couloir/couloir.html";
      } else {
        feedback.textContent = "Code incorrect.";
        feedback.style.color = "#ff5555";
      }
    }

      