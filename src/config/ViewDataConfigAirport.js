import { AjaxStore, GridRowModel, StringHelper } from '@bryntum/grid';

class Gate extends GridRowModel {
    static fields = [
        { name : 'capacity', type : 'number' },
        'domestic',
        'airline',
        'manager',
        { name : 'lounges', type : 'array' },
        'type',
        { name: 'icon', type: 'number' },
        'rowHeight'
    ];
}

class Terminal extends GridRowModel {
    static fields = [
        { name : 'lounges', type : 'array' }
    ];
}

const store = new AjaxStore({
    modelClass : Gate,
    readUrl    : '/data/airport.json',
    autoLoad   : true,
    tree       : true,
    //lazyLoad: { chunkSize: 150 },
});

const useGridConfig = () => {
    return {
        store,
        selectionMode : {
            row          : true,
            checkboxOnly : false
        },
        stateId           : 'taesy-tree-grid',
        animateTreeNodeToggle : false,
        cellEditFeature   : false,
        filterBarFeature  : false,
        rowReorderFeature : false,
        stripeFeature     : true,
        treeFeature       : true,
        autoHeight        : false,
        height            : 300,
        rowHeight         : 25,
        rowResizeFeature  : false,
        loadMask          : 'Loading tree data...',
        onSelectionChange({ source, selected, deselected }) {
            if (selected.length === 1 && !selected[0].isLeaf) {
                selected[0].children.forEach(record =>
                    source.selectRow({
                        record,
                        addToSelection : true,
                        scrollIntoView : false
                    })
                );
            }
            if (deselected.length === 1 && !deselected[0].isLeaf) {
                source.deselectRows(deselected[0].children);
            }
        },
        columns : [
            {
                text        : 'Name',
                field       : 'name',
                width       : 400,
                type        : 'tree',
                touchConfig : { editor : false },
                htmlEncode  : false,
                readOnly: true, filterable: false,
                locked: true,
                renderer({ value, record, row }) {
                   if (record.type === 'terminal') { // record instanceof does not seem to work...
                        const terminal = record;

                        row.addCls('terminal');
                        return `${StringHelper.encodeHtml(value)}<div class="lounge-list">
                            <!--<div>Lounges</div>-->
                                <ul>
                                    ${terminal.lounges?.map(name => `<li>
                                        <i class="b-fa b-fa-martini-glass"></i>${StringHelper.encodeHtml(name)}
                                    </li>`).join('')}
                                </ul>
                            </div>`;
                    }

                    // Have to wrap in a div to not get assigned as a text-node, which would render O`Hare as `O&39;Hare`
                   return `<div>${StringHelper.encodeHtml(value)}</div>`;
                }
                // You can customize expand/collapse icons
                // expandIconCls   : 'b-fa b-fa-plus-square',
                // collapseIconCls : 'b-fa b-fa-minus-square'
            },
            { text : 'Id', field : 'id', width : 40, editor : false },
            { text : 'ParentIndex', field : 'parentIndex', width : 40 },
            { text : 'Lounges', field : 'lounges', width : 300,
                vue : true,
                renderer({ record: { lounges : arr } }) {
                    return {
                        is : 'ArrayRenderer',
                        //title: 'hallo',
                        //divclass: 'b-fa b-fa-martini-glass',
                        ulstyle: 'margin: 0.5rem; padding: 0rem; list-style-type: circle;',
                        listyle: 'b-fa b-fa-martini-glass',
                        arr,
                    };
                }
            },
            { text : 'Icon', field : 'icon', type: 'number', width : 10, editable: false, searchable: false,
                align: 'center',
                vue : true,
                renderer({ record: { icon } }) {
                    return {
                        is : 'IconRenderer',
                        icon
                    };
                }, readOnly: true, filterable: false,
            },
            { type : 'aggregate', text : 'Capacity', field : 'capacity', width : 300 },
            { text : 'Domestic', field : 'domestic', width : 300 },
            { text : 'Airline', field : 'airline', width : 300 },
            { text : 'Responsible<br/>Manager', field : 'manager', width : 100, htmlEncodeHeaderText : false }
        ],
    };
};

export { useGridConfig };