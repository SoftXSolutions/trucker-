# Admin Dashboard API Integration Guide

## Overview
The Admin Dashboard is built with a clean component structure and centralized API service for easy backend integration.

## File Structure
```
src/
├── pages/
│   └── Admin.js                    # Main admin dashboard page
├── components/
│   └── admin/
│       ├── StatCard.js             # Reusable stat card component
│       ├── AlertCard.js            # Alert notification card
│       └── ApplicationCard.js      # Mover application card
└── services/
    └── adminApi.js                 # Centralized API service
```

## API Service (`src/services/adminApi.js`)

### Configuration
1. Set your API base URL in `.env`:
```env
REACT_APP_API_URL=https://api.yourdomain.com
```

2. The service automatically includes authentication token from localStorage:
```javascript
'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
```

### Available API Functions

#### Dashboard Stats
```javascript
getDashboardStats()
```
**Endpoint:** `GET /admin/stats`
**Returns:**
```javascript
{
  totalRevenue: number,
  revenueTrend: { value: string, isPositive: boolean, period: string },
  activeMovers: number,
  moversTrend: { value: string, isPositive: boolean, period: string },
  totalLeads: number,
  leadsPeriod: string,
  pendingActions: number,
  actionsNote: string
}
```

#### Revenue Trend
```javascript
getRevenueTrend()
```
**Endpoint:** `GET /admin/revenue-trend`
**Returns:**
```javascript
{
  labels: string[],
  leads: number[],
  revenue: number[]
}
```

#### Lead Distribution
```javascript
getLeadDistribution()
```
**Endpoint:** `GET /admin/lead-distribution`
**Returns:**
```javascript
[
  { status: string, value: number, color: string }
]
```

#### Critical Alerts
```javascript
getCriticalAlerts()
```
**Endpoint:** `GET /admin/alerts`
**Returns:**
```javascript
[
  {
    id: number,
    type: 'critical' | 'warning' | 'info',
    title: string,
    description: string,
    time: string
  }
]
```

#### Mover Applications
```javascript
getMoverApplications()
```
**Endpoint:** `GET /admin/applications`
**Returns:**
```javascript
[
  {
    id: number,
    companyName: string,
    type: string,
    services: string,
    time: string,
    verified: boolean
  }
]
```

#### Approve Application
```javascript
approveMoverApplication(applicationId)
```
**Endpoint:** `POST /admin/applications/:id/approve`

#### Reject Application
```javascript
rejectMoverApplication(applicationId, reason)
```
**Endpoint:** `POST /admin/applications/:id/reject`
**Body:**
```javascript
{ reason: string }
```

#### Review Alert
```javascript
reviewAlert(alertId)
```
**Endpoint:** `POST /admin/alerts/:id/review`

### Pagination Endpoints
```javascript
getUsers(page, limit)      // GET /admin/users?page=1&limit=10
getMovers(page, limit)     // GET /admin/movers?page=1&limit=10
getLeads(page, limit)      // GET /admin/leads?page=1&limit=10
```

## How to Integrate Your Backend

### Step 1: Uncomment API Calls
In `src/services/adminApi.js`, uncomment the actual API calls and remove mock data:

```javascript
// Before (Mock):
export const getDashboardStats = async () => {
    // return await apiCall('/admin/stats');
    return { /* mock data */ };
};

// After (Real API):
export const getDashboardStats = async () => {
    return await apiCall('/admin/stats');
};
```

### Step 2: Update Endpoints
Modify endpoint paths to match your backend:

```javascript
// Example: If your endpoint is /api/v1/admin/statistics
export const getDashboardStats = async () => {
    return await apiCall('/api/v1/admin/statistics');
};
```

### Step 3: Handle Authentication
Update the authentication header if needed:

```javascript
const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('yourTokenKey')}`,
            // Or use cookies, session, etc.
        },
        ...options,
    });
    // ...
};
```

### Step 4: Error Handling
Customize error handling in the `apiCall` function:

```javascript
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            // Custom error handling
            if (response.status === 401) {
                // Redirect to login
                window.location.href = '/login';
            }
            throw new Error(`API Error: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        // Log to error tracking service
        console.error('API Call Error:', error);
        throw error;
    }
};
```

## Adding New Features

### Add a New Stat Card
1. Update `getDashboardStats()` in `adminApi.js`
2. Add new `<StatCard>` in `Admin.js`:

```javascript
<StatCard
    title="New Metric"
    value={stats?.newMetric}
    subtitle="Description"
    icon={<YourIcon />}
    iconBg="bg-color-100"
/>
```

### Add a New Tab
1. Add tab to the tabs array in `Admin.js`:
```javascript
{ id: 'newtab', label: 'New Tab', icon: '🆕' }
```

2. Add content section:
```javascript
{activeTab === 'newtab' && (
    <YourNewComponent />
)}
```

### Add a New API Endpoint
1. Add function to `adminApi.js`:
```javascript
export const getNewData = async () => {
    return await apiCall('/admin/new-endpoint');
};
```

2. Use in component:
```javascript
import adminApi from '../services/adminApi';

const data = await adminApi.getNewData();
```

## Chart Integration

### Using Chart.js
```bash
npm install chart.js react-chartjs-2
```

```javascript
import { Line, Pie } from 'react-chartjs-2';

// In your component:
<Line data={chartData} options={chartOptions} />
```

### Using Recharts
```bash
npm install recharts
```

```javascript
import { LineChart, Line, PieChart, Pie } from 'recharts';

// In your component:
<LineChart data={data}>
    <Line dataKey="revenue" stroke="#8884d8" />
</LineChart>
```

## Color Scheme
The admin dashboard uses a gradient background and clean card design:

- **Background:** `from-blue-50 via-indigo-50 to-purple-50`
- **Cards:** White with subtle shadows
- **Primary:** Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Warning:** Orange (#f59e0b)
- **Danger:** Red (#ef4444)

## Responsive Design
All components are fully responsive using Tailwind CSS:
- Mobile: Single column layout
- Tablet: 2-column grid
- Desktop: 4-column grid for stats, 2-column for content

## Security Notes
1. Always validate user permissions on the backend
2. Use HTTPS for all API calls
3. Implement rate limiting
4. Sanitize all user inputs
5. Use secure authentication tokens
6. Implement CSRF protection

## Testing
Mock data is provided for development. To test:
1. Navigate to `/admin`
2. All features work with mock data
3. Replace with real API calls when ready

## Support
For questions or issues, refer to the main project documentation.
