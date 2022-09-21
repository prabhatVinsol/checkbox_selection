/*jshint esversion: 6*/
/*global document*/
/*global alert*/

class Data {
    static getCheckboxList() {
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'None'];
      } 
  }
  
  class CheckboxOperations {
    
    createCheckboxList() {
      let ul = this.createUlElementForCheckbox();
      document.body.appendChild(ul);
        this.createAndAppendCheckboxListTo(ul);
    }
  
    createAndAppendCheckboxListTo(ul) {
        let checkboxIds = Data.getCheckboxList();
        checkboxIds.forEach((checkboxId) =>{
        let label = this.createLabelElement(checkboxId);
              let checkbox = this.createCheckbox(checkboxId);
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(checkboxId));
        
        ul.appendChild(this.createLiElementAndAppend(label));
  
      });
      }
    createUlElementForCheckbox() {
        let ul = document.createElement('ul');
      ul.style.listStyle = 'none';
        return ul;
      }
  
      createLiElementAndAppend(label) {
      let li = document.createElement('li');
      li.appendChild(label);
      return li;
    }
  
      createCheckbox(checkboxId) {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = checkboxId;
      checkbox.value = checkboxId;
      checkbox.id = checkboxId;
      checkbox.style.margin = '10px';
      return checkbox;
    }
  
      createLabelElement(labelId) {
      const label = document.createElement('label');
      label.setAttribute('for', labelId);
      return label;
    }
  
    makeAllCheckboxUnchecked() {
    let checkboxes = document.querySelectorAll('input');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkbox.id === "None";
    });
  }
  
   isMoreThanThreeCheckboxChecked(id) {
    let count = 0;
    let days = [];
    let checkboxes = document.querySelectorAll('input');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        count += 1;
        if (checkbox.id != id) {
          days.push(checkbox.name);
        }
      }
    });
    
    return [(count > 3), days];
  }
  
       isCheckboxAlreadyChecked(id) {
      let checkbox = document.getElementById(id);
      return checkbox.checked;
      }
  
      uncheckNoneCheckbox() {
      let checkbox = document.getElementById("None");
      checkbox.checked = false;
      }
  
      getMoreThanThreeCheckBoxAlert(selectedDays) {
      
    }
  }
  
      let checkboxOperations = new CheckboxOperations();
      checkboxOperations.createCheckboxList();
  
      Data.getCheckboxList().forEach((checkboxId) =>{
        let checkElem = document.getElementById(checkboxId);
        checkElem.onchange = checkboxCliked;
      });
  
      function checkboxCliked(event) {
      if (event.target.id === 'None') {
        checkboxOperations.makeAllCheckboxUnchecked();
        return;
        }
      let isMoreThanThreeCheckBox = checkboxOperations.isMoreThanThreeCheckboxChecked(event.target.id);
      checkboxClikedOtherThanNone(event, isMoreThanThreeCheckBox[0], isMoreThanThreeCheckBox[1]);
    }
  
      function checkboxClikedOtherThanNone(event, isMoreThanThreeCheckBox, selectedDays) {
      if (isMoreThanThreeCheckBox) {
        event.target.checked = false;
        alert(`Only 3 days can be selected. You have already selected ${selectedDays[0]}, ${selectedDays[1]} and ${selectedDays[2]}`);
      } else {
        checkboxOperations.uncheckNoneCheckbox();
        event.target.checked = checkboxOperations.isCheckboxAlreadyChecked(event.target.id);
      }
  }

    