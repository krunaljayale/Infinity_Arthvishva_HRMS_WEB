import { useState } from 'react';
import { useEmployees } from './useEmployees';

export function useEmployeeDirectory() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Connect the hook to your existing data fetcher
    const { employees, isLoading, error, meta } = useEmployees(searchQuery, department, status, page, limit);

    return {
        viewMode,
        setViewMode,
        filters: {
            searchQuery, setSearchQuery,
            department, setDepartment,
            status, setStatus
        },
        pagination: {
            page,
            setPage,
            limit,
            setLimit,
            totalRecords: meta?.totalRecords || 0,
            totalPages: meta?.totalPages || 0
        },
        data: employees,
        isLoading,
        error
    };
}