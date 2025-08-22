document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // animasi hamburger ke cross (cuma kalo dibawah 768px)
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // filter gallery
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        galleryItems.forEach((item) => {
          if (filter === "all" || item.getAttribute("data-category") === filter) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // validasi form subscription (halaman subscription.html)
  const subscribeForm = document.getElementById("subscribeForm")
  const successMessage = document.getElementById("successMessage")
  const closeSuccess = document.getElementById("closeSuccess")

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // reset error message sebelumnya
      const errorElements = document.querySelectorAll(".error")
      errorElements.forEach((element) => {
        element.textContent = ""
      })

      let isValid = true

      // validasi full name (gaboleh kosong dan min 3 chara)
      const fullName = document.getElementById("fullName")
      if (!fullName.value.trim()) {
        document.getElementById("fullNameError").textContent = "Full name is required"
        isValid = false
      } else if (fullName.value.trim().length < 3) {
        document.getElementById("fullNameError").textContent = "Full name must be at least 3 characters"
        isValid = false
      }

      // validasi email (harus ada @ dan .)
      const email = document.getElementById("email")
      if (!email.value.trim()) {
        document.getElementById("emailError").textContent = "Email is required"
        isValid = false
      } else {
        const emailValue = email.value.trim()
        if (
          !emailValue.includes("@") ||
          !emailValue.includes(".") ||
          emailValue.indexOf("@") === 0 ||
          emailValue.lastIndexOf(".") < emailValue.indexOf("@")
        ) {
          document.getElementById("emailError").textContent = "Please enter a valid email address"
          isValid = false
        }
      }

      // validasi password ( min 8 chara)
      const password = document.getElementById("password")
      if (!password.value) {
        document.getElementById("passwordError").textContent = "Password is required"
        isValid = false
      } else if (password.value.length < 8) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters"
        isValid = false
      }

      // validasi password konfirmasi
      const confirmPassword = document.getElementById("confirmPassword")
      if (!confirmPassword.value) {
        document.getElementById("confirmPasswordError").textContent = "Please confirm your password"
        isValid = false
      } else if (confirmPassword.value !== password.value) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match"
        isValid = false
      }

      // validasi umur min 18 max 100
      const age = document.getElementById("age")
      if (!age.value) {
        document.getElementById("ageError").textContent = "Age is required"
        isValid = false
      } else {
        const ageValue = Number.parseInt(age.value)
        if (isNaN(ageValue)) {
          document.getElementById("ageError").textContent = "Please enter a valid age"
          isValid = false
        } else if (ageValue < 18) {
          document.getElementById("ageError").textContent = "You must be at least 18 years old"
          isValid = false
        } else if (ageValue > 100) {
          document.getElementById("ageError").textContent = "Please enter a valid age"
          isValid = false
        }
      }

      // validasi preferred contact (harus dipilih)
      const preferredContact = document.getElementById("preferredContact")
      if (preferredContact.value === "") {
        document.getElementById("preferredContactError").textContent = "Please select a preferred contact method"
        isValid = false
      }

      // validasi terms (harus dicentang)
      const terms = document.getElementById("terms")
      if (!terms.checked) {
        document.getElementById("termsError").textContent = "You must agree to the terms and conditions"
        isValid = false
      }

      // tampilin sukses message dan store data user ke localStorage
      if (isValid) {
        localStorage.setItem("fullName", fullName.value.trim())
        localStorage.setItem("email", email.value.trim())
        localStorage.setItem("password", password.value)
        localStorage.setItem("age", age.value)
        localStorage.setItem("preferredContact", preferredContact.value)

        successMessage.style.display = "flex"
        subscribeForm.reset()
      }
    })
  }

  // close success message
  if (closeSuccess) {
    closeSuccess.addEventListener("click", () => {
      successMessage.style.display = "none"
    })
  }
  })