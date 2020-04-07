/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('my-input');
    const templateContent = template.content;

    this.el = this.attachShadow({ mode: 'open' });
    this.el.appendChild(templateContent.cloneNode(true));

    this.inputEl = this.el.querySelector('#input');

    let letters = this.getAttribute("letters");
    if (letters === "true") {
      this.shadowRoot.querySelector("#letter").style.display = "inline";
    }
    else {
      this.shadowRoot.querySelector("#letter").style.display = "none";
    }
  }

  connectedCallback() {
    this.el.querySelector('#input').addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    let validationType = this.el.querySelector('[name=validation-type]:checked').value;
    const isValid = !this.validate(validationType, this.inputEl.value);
    console.log("isvalid", !isValid);
    console.log("validationType", validationType);
    console.log("inputEl", this.inputEl.value);
    if (isValid) {
      if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only numbers');
      }
      else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
        this.inputEl.setCustomValidity('Only letters');
      }
      else {
        this.inputEl.setCustomValidity('Password must contain only digits, letters, !@#&*');
      }
      this.inputEl.reportValidity();
    } else {
      this.inputEl.setCustomValidity('');
      this.inputEl.reportValidity();
    }
  }
      // validate() {
  //   if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
  //     if (/[^0-9]/.test(this.inputEl.value)) return false;

  //   }
  //   else if (this.el.querySelector('[name=validation-type]:checked').value === 'password') {
  //     if ((/[*@#!&]/.test(this.inputEl.value)) && (/[0-9]/.test(this.inputEl.value)) && (/[a-zA-Z]/.test(this.inputEl.value))) return true;
  //     else return false;
  //   }
  //   else {
  //     if (/[^a-zA-Z]/.test(this.inputEl.value)) return false;
  //   }
  //   return true;
  // }




  validate(validationType, inputEl) {

    if ((validationType) === 'number') {


      if (/[^0-9]/.test(inputEl)) return false;


    } else if ((validationType) === 'letter') {


      if (/[^a-zA-Z]/.test(inputEl)) return false;


    } else {


      // if (!(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{3,}.*?)(?=.*[!@#&*])/.test(inputEl))) return false;


      let exp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#&*])/.exec(inputEl);


      if (exp) {
        if (!((/(?=(\d{3}))/g.test(inputEl)))) return true;
      }
      return false
    }
    return true;


  }
}
customElements.define('my-input', MyInput);