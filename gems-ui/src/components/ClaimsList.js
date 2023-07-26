import { DataGrid } from '@mui/x-data-grid';
import format from 'date-fns/format'

const columns = [
    { field: 'number', headerName: 'Claim Number', width: 150 },
    { field: 'typeDesc', headerName: 'Category', width: 150 },
    { field: 'subTypeDesc', headerName: 'Sub Category', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    {
        field: 'generatedOn', headerName: 'Created On', width: 150, renderCell: (params) => {
            return <div className="rowitem">{format(new Date(params.row.generatedOn), 'dd-MMM-yyyy')}</div>;
        }
    },
    { field: 'status', headerName: 'Status', width: 150 },
    {
        field: 'owner', headerName: 'Raised By', width: 150, renderCell: (params) => {
            return <div className="rowitem">{params.row.owner.firstName}, {params.row.owner.lastName}</div>;
        }
    },
];

export default function ClaimList({ claims, apiRef }) {
    return (
        <DataGrid rows={claims} columns={columns} apiRef={apiRef} getRowId={(row) => row._id} sx={{
        }} />
    )
}