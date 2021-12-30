<script lang="tsx">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default {
    name: 'b-table',
    props: {
        rows: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        renderHead(h, columnsOptions) {
            return columnsOptions.map((column) => {
                const renderedTitle = column.scopedSlots.title ? column.scopedSlots.title() : column.title;

                return (
                    <th key={column.prop} class={this.$style.headerCell}>
                        {renderedTitle}
                    </th>
                );
            });
        },
        renderRows(h, columnsOptions) {
            return this.rows.map((row, index) => {
                return <tr key={row.id || index}>{...this.renderColumns(h, row, columnsOptions)}</tr>;
            });
        },
        renderColumns(h, row, columnsOptions) {
            return columnsOptions.map((column) => {
                return (
                    <td key={column.prop} class={this.$style.cell}>
                        {column.scopedSlots.body ? column.scopedSlots.body({ row }) : row[column.prop]}
                    </td>
                );
            });
        },
        getColumnOptions() {
            return this.$slots.default
                .filter(item => item.componentOptions && item.componentOptions.tag === 'b-table-column')
                .map(column =>
                Object.assign({}, column.componentOptions.propsData, {
                        scopedSlots: column.data.scopedSlots || {}
                    }
                )
            );
        }
    },
    render(h) {
        const columnsOptions = this.getColumnOptions();
        const columnsHead = this.renderHead(h, columnsOptions);
        const rows = this.renderRows(h, columnsOptions);

        return (
            <table class={this.$style.table}>
                <thead>{...columnsHead}</thead>
                <tbody>{...rows}</tbody>
            </table>
        );
    }
};
</script>

<style module>
.table {
    border-spacing: 0;
    width: 100%;
}


.cell {
    text-align: left;
    border-bottom: 1px solid #c8cacc;
    padding: 8px;
}

.headerCell {
    composes: cell;
    background: #c7cbcb;
}
</style>
