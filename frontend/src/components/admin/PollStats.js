import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { pollService } from '../../services/pollService';
import { voteService } from '../../services/voteService';
import Loader from '../common/Loader';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PollStats = ({ pollId: propsPollId }) => {
  const [loading, setLoading] = useState(true);
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState([]);
  const [stats, setStats] = useState({
    totalVotes: 0,
    optionCounts: {},
    votesPerDay: {},
    deviceStats: {},
    demographicStats: {}
  });
  
  const { pollId: paramPollId } = useParams();
  const pollId = propsPollId || paramPollId;

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        setLoading(true);
        
        // Fetch poll details
        const pollData = await pollService.getPollById(pollId);
        setPoll(pollData);
        
        // Fetch all votes for this poll
        const votesData = await voteService.getVotesByPoll(pollId);
        setVotes(votesData);
        
        // Process stats
        processStats(pollData, votesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching poll stats:', error);
        setLoading(false);
      }
    };

    if (pollId) {
      fetchPollData();
    }
  }, [pollId]);

  const processStats = (pollData, votesData) => {
    // Initialize stats
    const optionCounts = {};
    pollData.options.forEach(option => {
      optionCounts[option] = 0;
    });

    const votesPerDay = {};
    const deviceStats = { desktop: 0, mobile: 0, tablet: 0, other: 0 };
    const demographicStats = { age: {}, gender: {}, location: {} };

    // Count votes by option
    votesData.forEach(vote => {
      // Count by option
      if (optionCounts[vote.option] !== undefined) {
        optionCounts[vote.option]++;
      }

      // Group by date (YYYY-MM-DD format)
      const voteDate = new Date(vote.createdAt).toISOString().split('T')[0];
      votesPerDay[voteDate] = (votesPerDay[voteDate] || 0) + 1;

      // Count by device type
      if (vote.metadata?.device) {
        const device = vote.metadata.device.toLowerCase();
        if (device.includes('mobile')) deviceStats.mobile++;
        else if (device.includes('tablet')) deviceStats.tablet++;
        else if (device.includes('desktop')) deviceStats.desktop++;
        else deviceStats.other++;
      }

      // Demographics (if available)
      if (vote.metadata?.demographics) {
        const { age, gender, location } = vote.metadata.demographics;
        
        // Age groups
        if (age) {
          const ageGroup = getAgeGroup(age);
          demographicStats.age[ageGroup] = (demographicStats.age[ageGroup] || 0) + 1;
        }

        // Gender
        if (gender) {
          demographicStats.gender[gender] = (demographicStats.gender[gender] || 0) + 1;
        }

        // Location
        if (location) {
          demographicStats.location[location] = (demographicStats.location[location] || 0) + 1;
        }
      }
    });

    setStats({
      totalVotes: votesData.length,
      optionCounts,
      votesPerDay,
      deviceStats,
      demographicStats
    });
  };

  const getAgeGroup = (age) => {
    if (age < 18) return 'Under 18';
    if (age < 25) return '18-24';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    if (age < 65) return '55-64';
    return '65+';
  };

  const getChartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  });

  const getBarChartData = () => {
    const labels = Object.keys(stats.optionCounts);
    return {
      labels,
      datasets: [
        {
          label: 'Number of Votes',
          data: labels.map(label => stats.optionCounts[label]),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  };

  const getPieChartData = () => {
    const labels = Object.keys(stats.optionCounts);
    return {
      labels,
      datasets: [
        {
          label: 'Votes',
          data: labels.map(label => stats.optionCounts[label]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getTimelineData = () => {
    const sortedDates = Object.keys(stats.votesPerDay).sort();
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Votes per Day',
          data: sortedDates.map(date => stats.votesPerDay[date]),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  };

  if (loading) {
    return <Loader />;
  }

  if (!poll) {
    return <div className="alert alert-danger">Poll not found</div>;
  }

  return (
    <div className="poll-stats">
      <h2>{poll.title} - Statistics</h2>
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Votes</h3>
          <div className="stat-value">{stats.totalVotes}</div>
        </div>
        
        {poll.endDate && new Date(poll.endDate) < new Date() ? (
          <div className="stat-card">
            <h3>Status</h3>
            <div className="stat-value closed">Closed</div>
          </div>
        ) : (
          <div className="stat-card">
            <h3>Status</h3>
            <div className="stat-value active">Active</div>
          </div>
        )}
        
        <div className="stat-card">
          <h3>Created</h3>
          <div className="stat-value">{new Date(poll.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Vote Distribution</h3>
          <Bar options={getChartOptions('Vote Distribution')} data={getBarChartData()} />
        </div>
        
        <div className="chart-wrapper">
          <h3>Vote Percentage</h3>
          <Pie options={getChartOptions('Vote Percentage')} data={getPieChartData()} />
        </div>
        
        <div className="chart-wrapper">
          <h3>Voting Timeline</h3>
          <Bar options={getChartOptions('Votes per Day')} data={getTimelineData()} />
        </div>
      </div>

      {Object.keys(stats.deviceStats).some(key => stats.deviceStats[key] > 0) && (
        <div className="section device-stats">
          <h3>Device Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Desktop:</span>
              <span className="stat-value">{stats.deviceStats.desktop}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Mobile:</span>
              <span className="stat-value">{stats.deviceStats.mobile}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tablet:</span>
              <span className="stat-value">{stats.deviceStats.tablet}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Other:</span>
              <span className="stat-value">{stats.deviceStats.other}</span>
            </div>
          </div>
        </div>
      )}

      {Object.keys(stats.demographicStats.age).length > 0 && (
        <div className="section demographic-stats">
          <h3>Demographic Statistics</h3>
          <div className="demographic-group">
            <h4>Age Groups</h4>
            <div className="stats-grid">
              {Object.entries(stats.demographicStats.age).map(([group, count]) => (
                <div key={group} className="stat-item">
                  <span className="stat-label">{group}:</span>
                  <span className="stat-value">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {Object.keys(stats.demographicStats.gender).length > 0 && (
        <div className="demographic-group">
          <h4>Gender Distribution</h4>
          <div className="stats-grid">
            {Object.entries(stats.demographicStats.gender).map(([gender, count]) => (
              <div key={gender} className="stat-item">
                <span className="stat-label">{gender}:</span>
                <span className="stat-value">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {votes.length > 0 && (
        <div className="section recent-votes">
          <h3>Recent Votes</h3>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Option</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {votes.slice(0, 10).map(vote => (
                  <tr key={vote._id}>
                    <td>{vote.user?.username || 'Anonymous'}</td>
                    <td>{vote.option}</td>
                    <td>{new Date(vote.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollStats;