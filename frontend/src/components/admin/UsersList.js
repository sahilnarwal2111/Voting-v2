import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Loader from '../common/Loader';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filterRole, sortField, sortDirection]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await authService.getUsers({
        page: currentPage,
        limit: usersPerPage,
        role: filterRole,
        sort: `${sortDirection === 'desc' ? '-' : ''}${sortField}`,
        search: searchTerm
      });
      
      setUsers(response.users);
      setTotalPages(Math.ceil(response.total / usersPerPage));
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchUsers();
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await authService.updateUserRole(userId, newRole);
      
      // Update the user in the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role. Please try again.');
    }
  };

  const handleSortChange = (field) => {
    // If clicking the same field, toggle direction, otherwise set new field with default 'asc'
    if (field === sortField) {
      setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await authService.updateUserStatus(userId, newStatus);
      
      // Update the user in the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (err) {
      console.error('Error updating user status:', err);
      setError('Failed to update user status. Please try again.');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button 
          className="pagination-button"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        
        <button 
          className="pagination-button"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  if (loading && users.length === 0) {
    return <Loader />;
  }

  return (
    <div className="users-list-container">
      <div className="panel-header">
        <h2>User Management</h2>
        <div className="filter-controls">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          
          <select 
            value={filterRole} 
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {users.length === 0 ? (
        <div className="no-results">No users found</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSortChange('username')}>
                    Username {getSortIcon('username')}
                  </th>
                  <th onClick={() => handleSortChange('email')}>
                    Email {getSortIcon('email')}
                  </th>
                  <th onClick={() => handleSortChange('role')}>
                    Role {getSortIcon('role')}
                  </th>
                  <th onClick={() => handleSortChange('status')}>
                    Status {getSortIcon('status')}
                  </th>
                  <th onClick={() => handleSortChange('createdAt')}>
                    Joined {getSortIcon('createdAt')}
                  </th>
                  <th>Polls</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className={`status-${user.status}`}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="role-select"
                        disabled={user.role === 'admin' && users.filter(u => u.role === 'admin').length === 1}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={`status-toggle ${user.status}`}
                        onClick={() => handleToggleStatus(user._id, user.status)}
                      >
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="polls-count">{user.pollsCount || 0}</td>
                    <td className="actions-cell">
                      <Link 
                        to={`/admin/users/${user._id}`}
                        className="view-details-button"
                      >
                        Details
                      </Link>
                      <Link 
                        to={`/admin/users/${user._id}/polls`}
                        className="view-polls-button"
                      >
                        View Polls
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default UsersList;