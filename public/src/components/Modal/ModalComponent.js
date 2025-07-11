class ModalComponent {
    constructor(modalId, title, formFields, onSave) {
        this.modalId = modalId;
        this.title = title;
        this.formFields = formFields;
        this.onSave = onSave;
        this.modalInstance = null;
        this.modalElement = document.getElementById(this.modalId);

        if (!this.modalElement) {
            this.render();
        } else {
            this.modalInstance = bootstrap.Modal.getInstance(this.modalElement) || new bootstrap.Modal(this.modalElement);
        }
        this.bindEvents();
    }

    render() {
        const modalHtml = `
            <div class="modal fade" id="${this.modalId}" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${this.modalId}-title">${this.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="${this.modalId}-form">
                                <input type="hidden" id="item-id">
                                ${this.formFields.map(field => this.createFieldHtml(field)).join('')}
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="${this.modalId}-save-btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.modalElement = document.getElementById(this.modalId);
        this.modalInstance = new bootstrap.Modal(this.modalElement);
        this.initLiveSearch();
    }

    createFieldHtml(field) {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = `mb-3 ${field.className || ''}`;
        if (field.attributes) {
            for (const [key, value] of Object.entries(field.attributes)) {
                fieldWrapper.setAttribute(key, value);
            }
        }
        if (field.style) {
            for (const [key, value] of Object.entries(field.style)) {
                fieldWrapper.style[key] = value;
            }
        }

        let fieldHtml;

        switch (field.type) {
            case 'checkbox':
                fieldHtml = `
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="${field.id}">
                        <label class="form-check-label" for="${field.id}">${field.label}</label>
                    </div>
                `;
                break;
            case 'select':
                const optionsHtml = field.options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
                fieldHtml = `<label for="${field.id}" class="form-label">${field.label}</label><select class="form-control" id="${field.id}" data-live-search="true">${optionsHtml}</select>`;
                break;
            default:
                fieldHtml = `<label for="${field.id}" class="form-label">${field.label}</label><input type="${field.type || 'text'}" class="form-control" id="${field.id}" required>`;
                break;
        }
        fieldWrapper.innerHTML = fieldHtml;
        return fieldWrapper.outerHTML;
    }

    initLiveSearch(element) {
        const searchInputs = element ? element.querySelectorAll('.live-search-input') : 
            this.modalElement.querySelectorAll('.live-search-input');

        searchInputs.forEach(input => {
            const wrapper = input.closest('.live-search-wrapper');
            const resultsContainer = wrapper.querySelector('.live-search-results');
            
            // Clear previous results before showing new ones
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';

            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const fieldId = wrapper.querySelector('input[type="hidden"]').id;
                const field = this.formFields.find(f => f.id === fieldId);
                const options = field.options || [];

                resultsContainer.innerHTML = ''; // Clear previous results
                
                if (searchTerm.length > 0) {
                    const filteredOptions = options.filter(opt => 
                        opt.text.toLowerCase().includes(searchTerm)
                    );
                    
                    filteredOptions.forEach(opt => {
                        resultsContainer.innerHTML += 
                            `<div class="live-search-item" data-value="${opt.value}">${opt.text}</div>`;
                    });
                    
                    resultsContainer.style.display = filteredOptions.length ? 'block' : 'none';
                }
            });

            resultsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('live-search-item')) {
                    const selectedValue = e.target.dataset.value;
                    const selectedText = e.target.textContent;
                    const hiddenInput = wrapper.querySelector('input[type="hidden"]');
                    hiddenInput.value = selectedValue;
                    input.value = selectedText;
                    resultsContainer.innerHTML = '';
                    resultsContainer.style.display = 'none';

                    const event = new Event('change', { bubbles: true });
                    hiddenInput.dispatchEvent(event);
                }
            });
        });
    }

    bindEvents() {
        const saveBtn = this.modalElement.querySelector(`#${this.modalId}-save-btn`);
        saveBtn.addEventListener('click', () => {
            const form = this.modalElement.querySelector('form');
            const id = form.querySelector('#item-id').value;
            const data = {};
            this.formFields.forEach(field => {
                const element = form.querySelector(`#${field.id}`);
                if (field.type === 'checkbox') {
                    data[field.id] = element.checked;
                } else if (field.multiple) {
                    data[field.id] = $(element).val();
                } else {
                    data[field.id] = element.value;
                }
            });
            this.onSave(id, data);
        });

        this.formFields.forEach(field => {
            if (field.onChange) {
                const element = this.modalElement.querySelector(`#${field.id}`);
                if (element) {
                    element.addEventListener('change', (e) => {
                        if (field.type === 'checkbox') {
                            field.onChange(e.target.checked);
                        } else {
                            field.onChange(e.target.value);
                        }
                    });
                }
            }
        });
    }

    updateField(fieldId, properties) {
        const field = this.formFields.find(f => f.id === fieldId);
        if (!field) return;

        Object.assign(field, properties);

        const oldWrapper = this.modalElement.querySelector(`#${fieldId}`).closest('.mb-3');
        const newHtml = this.createFieldHtml(field);
        const newWrapper = document.createElement('div');
        newWrapper.innerHTML = newHtml;

        oldWrapper.parentNode.replaceChild(newWrapper.firstElementChild, oldWrapper);

        const newElement = this.modalElement.querySelector(`#${fieldId}`);
        if (newElement && field.onChange) {
            newElement.addEventListener('change', (e) => {
                field.onChange(e.target.value);
            });
        }
        this.initLiveSearch(this.modalElement.querySelector(`#${fieldId}`).closest('.mb-3'));
    }

    show(item = null) {
        const form = this.modalElement.querySelector('form');
        form.reset();
        const titleEl = this.modalElement.querySelector('.modal-title');

        if (item) {
            titleEl.textContent = `Edit ${this.title}`;
            form.querySelector('#item-id').value = item.id;
            this.formFields.forEach(field => {
                const element = form.querySelector(`#${field.id}`);
                if (element) {
                    if (field.type === 'checkbox') {
                        element.checked = item[field.id] || false;
                        if (field.onChange) field.onChange(element.checked);
                    } else if (field.type === 'select' && !field.multiple) {
                        $(element).val(item[field.id] || '');
                    } else if (field.multiple) {
                        $(element).val(item[field.id] || []);
                    } else {
                        element.value = item[field.id] || '';
                    }
                }
            });
        } else {
            titleEl.textContent = `Add ${this.title}`;
            form.querySelector('#item-id').value = '';
            this.formFields.forEach(field => {
                const element = form.querySelector(`#${field.id}`);
                if (element) {
                    if (field.type === 'checkbox') {
                        element.checked = false;
                        if (field.onChange) field.onChange(false);
                    } else if (field.type === 'select') {
                        $(element).val('');
                    }
                }
            });
        }

        // Properly refresh selectpicker
        $(this.modalElement).find('select').selectpicker('destroy').selectpicker({
            noneSelectedText: 'Nothing selected',
            liveSearch: true
        });
        this.modalInstance.show();
    }

    hide() {
        this.modalInstance.hide();
    }

    updateOptions(fieldId, options) {
        const select = this.modalElement.querySelector(`#${fieldId}`);
        if (select) {
            select.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.text}</option>`).join('');
            $(select).selectpicker('refresh');
        }
    }
}
