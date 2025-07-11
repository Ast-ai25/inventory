class TableComponent {
    constructor(containerId, columns, data, onEdit, onDelete) {
        this.container = document.getElementById(containerId);
        this.columns = columns;
        this.data = data;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.filteredData = [...data];

        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="mb-3">
                <input type="text" class="form-control" id="table-search" placeholder="Search...">
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            ${this.columns.map(col => `<th>${col.header}</th>`).join('')}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        ${this.renderRows(this.filteredData)}
                    </tbody>
                </table>
            </div>
        `;

        this.bindEvents();
    }

    renderRows(data) {
        return data.map(row => `
            <tr>
                ${this.columns.map(col => {
                    if (col.accessor === 'is_active') {
                        return `<td>${row.is_active ? '<i class="fas fa-check-circle text-success"></i>' : '<i class="fas fa-times-circle text-danger"></i>'}</td>`;
                    }
                    let value = this.getNestedValue(row, col.accessor);
                    if (value === null || value === undefined || value === '') {
                        value = 'N/A';
                    }
                    return `<td>${value}</td>`;
                }).join('')}
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${row.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${row.id}"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    bindEvents() {
        const searchInput = this.container.querySelector('#table-search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filteredData = this.data.filter(row => 
                this.columns.some(col => 
                    String(this.getNestedValue(row, col.accessor)).toLowerCase().includes(searchTerm)
                )
            );
            this.container.querySelector('#table-body').innerHTML = this.renderRows(this.filteredData);
        });

        this.container.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');

            if (editBtn && this.onEdit) {
                this.onEdit(editBtn.dataset.id);
            }
            if (deleteBtn && this.onDelete) {
                this.onDelete(deleteBtn.dataset.id);
            }
        });
    }

    updateData(newData) {
        this.data = newData;
        this.filteredData = [...newData];
        this.container.querySelector('#table-body').innerHTML = this.renderRows(this.filteredData);
    }
}
