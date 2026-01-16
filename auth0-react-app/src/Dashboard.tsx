import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

// Demo bank accounts data
const bankAccounts = [
  {
    id: 'checking-1',
    name: 'Primary Checking',
    type: 'checking',
    accountNumber: '****4521',
    balance: 45230.50,
    available: 45230.50,
    institution: 'SecureBank',
  },
  {
    id: 'savings-1',
    name: 'High-Yield Savings',
    type: 'savings',
    accountNumber: '****8892',
    balance: 67890.25,
    available: 67890.25,
    apy: 4.5,
    institution: 'SecureBank',
  },
  {
    id: 'investment-1',
    name: 'Investment Portfolio',
    type: 'investment',
    accountNumber: '****3347',
    balance: 11469.00,
    available: 11469.00,
    change: 12.5,
    institution: 'SecureBank Invest',
  },
];

// Demo transactions data
const recentTransactions = [
  {
    id: 'tx-1',
    description: 'Apple Store',
    category: 'Shopping',
    date: '2025-01-14',
    amount: -999.00,
    status: 'completed',
  },
  {
    id: 'tx-2',
    description: 'Salary Deposit - ACME Corp',
    category: 'Income',
    date: '2025-01-13',
    amount: 5400.00,
    status: 'completed',
  },
  {
    id: 'tx-3',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    date: '2025-01-12',
    amount: -15.99,
    status: 'completed',
  },
  {
    id: 'tx-4',
    description: 'Whole Foods Market',
    category: 'Groceries',
    date: '2025-01-11',
    amount: -127.43,
    status: 'completed',
  },
  {
    id: 'tx-5',
    description: 'Transfer to Savings',
    category: 'Transfer',
    date: '2025-01-10',
    amount: -500.00,
    status: 'completed',
  },
  {
    id: 'tx-6',
    description: 'Uber Ride',
    category: 'Transportation',
    date: '2025-01-09',
    amount: -24.50,
    status: 'completed',
  },
  {
    id: 'tx-7',
    description: 'Electric Bill - PG&E',
    category: 'Utilities',
    date: '2025-01-08',
    amount: -145.00,
    status: 'pending',
  },
];

// Category icons map
const categoryIcons: Record<string, string> = {
  Shopping: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  Income: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  Entertainment: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
  Groceries: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  Transfer: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  Transportation: 'M8 7h8M8 11h8m-4 4h4m-8 0h.01M6 7l.01-.01M6 11l.01-.01M9 19l3 3m0 0l3-3m-3 3V10',
  Utilities: 'M13 10V3L4 14h7v7l9-11h-7z',
};

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState<'accounts' | 'transactions'>('accounts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your accounts...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="dashboard-nav-container">
          <div className="dashboard-nav-left">
            <div className="logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#236CFF"/>
                <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">SecureBank</span>
            </div>
            <div className="dashboard-tabs">
              <button
                onClick={() => setActiveTab('accounts')}
                className={`tab-btn ${activeTab === 'accounts' ? 'active' : ''}`}
              >
                Accounts
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
              >
                Transactions
              </button>
              <button className="tab-btn">Payments</button>
              <button className="tab-btn">Insights</button>
            </div>
          </div>

          <div className="dashboard-nav-right">
            {/* Notifications */}
            <button className="notification-btn">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="notification-dot"></span>
            </button>

            {/* User menu */}
            <div className="user-menu">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="user-menu-btn"
              >
                <div className="user-avatar">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name || 'User'} />
                  ) : (
                    <span>{user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <span className="user-name">{user?.name || 'User'}</span>
                <svg className="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{user?.name}</p>
                    <p className="dropdown-email">{user?.email}</p>
                  </div>
                  <button className="dropdown-item">Profile Settings</button>
                  <button className="dropdown-item">Security</button>
                  <button className="dropdown-item">Help & Support</button>
                  <hr />
                  <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="dropdown-item logout"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1>Good {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}!</h1>
              <p>Here's your financial overview</p>
            </div>
            <div className="welcome-balance">
              <p>Total Balance</p>
              <h2>{formatCurrency(totalBalance)}</h2>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {[
            { label: 'Transfer', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
            { label: 'Pay Bills', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
            { label: 'Deposit', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
            { label: 'More', icon: 'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z' },
          ].map((action, i) => (
            <button key={i} className="quick-action-btn">
              <div className="quick-action-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'accounts' ? (
          /* Accounts View */
          <div className="accounts-view">
            {/* Account Cards */}
            <div className="accounts-list">
              <h2>Your Accounts</h2>
              {bankAccounts.map((account) => (
                <div key={account.id} className="account-card">
                  <div className="account-card-header">
                    <div className="account-info">
                      <div className="account-name-row">
                        <h3>{account.name}</h3>
                        <span className="account-type">{account.type}</span>
                      </div>
                      <p className="account-number">{account.accountNumber} • {account.institution}</p>
                    </div>
                    <div className="account-balance">
                      <p className="balance-value">{formatCurrency(account.balance)}</p>
                      <p className="available-value">Available: {formatCurrency(account.available)}</p>
                    </div>
                  </div>
                  {account.type === 'savings' && account.apy && (
                    <div className="account-apy">
                      <span className="apy-rate">{account.apy}% APY</span>
                      <span className="apy-earnings">• Earning {formatCurrency((account.balance * account.apy) / 100 / 12)}/mo</span>
                    </div>
                  )}
                  {account.type === 'investment' && account.change && (
                    <div className="account-change">
                      <span className={`change-rate ${account.change >= 0 ? 'positive' : 'negative'}`}>
                        {account.change >= 0 ? '+' : ''}{account.change}%
                      </span>
                      <span className="change-period">• Past 30 days</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Account */}
              <button className="add-account-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Link Another Account</span>
              </button>
            </div>

            {/* Insights Panel */}
            <div className="insights-panel">
              <h2>Insights</h2>

              {/* Spending Overview */}
              <div className="insight-card">
                <h3>This Month's Spending</h3>
                <div className="spending-list">
                  {[
                    { category: 'Shopping', amount: 1245.00, color: '#236CFF' },
                    { category: 'Food & Dining', amount: 523.50, color: '#2ca01c' },
                    { category: 'Transportation', amount: 189.00, color: '#f59e0b' },
                    { category: 'Entertainment', amount: 89.99, color: '#8b5cf6' },
                  ].map((item, i) => (
                    <div key={i} className="spending-item">
                      <div className="spending-category">
                        <div className="category-dot" style={{ backgroundColor: item.color }}></div>
                        <span>{item.category}</span>
                      </div>
                      <span className="spending-amount">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
                <button className="insight-link">View All Categories</button>
              </div>

              {/* Upcoming Bills */}
              <div className="insight-card">
                <h3>Upcoming Bills</h3>
                <div className="bills-list">
                  {[
                    { name: 'Rent', due: 'Jan 25', amount: 2100.00 },
                    { name: 'Internet', due: 'Jan 28', amount: 79.99 },
                    { name: 'Phone', due: 'Feb 1', amount: 85.00 },
                  ].map((bill, i) => (
                    <div key={i} className="bill-item">
                      <div className="bill-info">
                        <p className="bill-name">{bill.name}</p>
                        <p className="bill-due">Due {bill.due}</p>
                      </div>
                      <span className="bill-amount">{formatCurrency(bill.amount)}</span>
                    </div>
                  ))}
                </div>
                <button className="insight-link">Manage Bills</button>
              </div>

              {/* Savings Goal */}
              <div className="insight-card">
                <div className="goal-header">
                  <h3>Vacation Fund</h3>
                  <span className="goal-percent">68%</span>
                </div>
                <div className="goal-progress">
                  <div className="goal-bar" style={{ width: '68%' }}></div>
                </div>
                <div className="goal-amounts">
                  <span className="goal-saved">{formatCurrency(3400)} saved</span>
                  <span className="goal-target">Goal: {formatCurrency(5000)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Transactions View */
          <div className="transactions-view">
            <div className="transactions-header">
              <h2>Recent Transactions</h2>
              <div className="transactions-actions">
                <button className="filter-btn">Filter</button>
                <button className="filter-btn">Export</button>
              </div>
            </div>

            <div className="transactions-list">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="transaction-item">
                  <div className="transaction-left">
                    <div className={`transaction-icon-wrapper ${tx.amount >= 0 ? 'income' : ''}`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={categoryIcons[tx.category] || categoryIcons.Income} />
                      </svg>
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-desc">{tx.description}</p>
                      <p className="transaction-meta">
                        {tx.category} • {formatDate(tx.date)}
                        {tx.status === 'pending' && <span className="pending-badge">• Pending</span>}
                      </p>
                    </div>
                  </div>
                  <span className={`transaction-amount ${tx.amount >= 0 ? 'positive' : ''}`}>
                    {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>

            <button className="view-all-btn">View All Transactions</button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} SecureBank. All rights reserved. Member FDIC.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
