import './App.css'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import homeIcon from './assets/icons/vuesax/outline/home.svg'
import inboxIcon from './assets/icons/vuesax/outline/message-2.svg'
import searchIcon from './assets/icons/vuesax/outline/global.svg'
import walletIcon from './assets/icons/vuesax/outline/wallet.svg'
import profileIcon from './assets/icons/vuesax/outline/profile-circle.svg'

type Screen =
  | 'signup-empty'
  | 'signup-email'
  | 'signup-filled'
  | 'signup-weak'
  | 'signup-error'
  | 'login'
  | 'email-verification'
  | 'email-resend'
  | 'otp'
  | 'otp-resend'
  | 'user-type'
  | 'b2b-selection'
  | 'account-success'
  | 'login-otp'
  | 'home'
  | 'inbox'
  | 'search'
  | 'wallet'
  | 'profile'
  | 'promotions'
  | 'transactions'
  | 'invest-dashboard'
  | 'property-detail'
  | 'experience-detail'
  | 'investment-detail'
  | 'service-detail'
  | 'booking-flow'
  | 'booking-shortlet'
  | 'create-investment'
  | 'splash'
  | 'verify-method'
  | 'verify-processing'
  | 'verify-success'
  | 'agent-step1'
  | 'agent-step2'
  | 'agent-step3'
  | 'owner-step1'
  | 'owner-step2'
  | 'owner-step3'
  | 'developer-step1'
  | 'developer-step2'
  | 'developer-step3'
  | 'developer-step4'
  | 'service-step1'
  | 'service-step2'
  | 'service-step3'
  | 'lifestyle-step1'
  | 'lifestyle-step2'
  | 'lifestyle-step3'
  | 'invest-step1'
  | 'invest-step2'
  | 'invest-step3'

const accent = '#d44260'
const logoBlack = '/Logo%20v2%20Black.png'
const logoWhiteVertical = '/Logo%20v2%20Vertical%20White.png'

type DetailItem =
  | { type: 'property'; title: string; img: string; price: string; meta?: string }
  | { type: 'experience'; title: string; img: string; price: string; meta?: string; date?: string }
  | { type: 'investment'; title: string; img: string; price: string; meta?: string }
  | { type: 'service'; title: string; img: string; price: string; meta?: string }

const propertyImages = [
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1505692069463-94d38117c63f?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=60',
]

const experienceImages = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=60',
]

const serviceImages = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=60',
]

const investImages = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=60',
]

const exploreImages = [
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1505692069463-94d38117c63f?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=60',
]

const getPropertyImage = (idx: number) => propertyImages[idx % propertyImages.length]

const screenFlows: { title: string; screens: Screen[] }[] = [
  {
    title: 'Onboarding & Verification',
    screens: [
      'splash',
      'signup-empty',
      'signup-email',
      'signup-weak',
      'signup-error',
      'signup-filled',
      'login',
      'email-verification',
      'email-resend',
      'otp',
      'otp-resend',
      'login-otp',
      'account-success',
      'verify-method',
      'verify-processing',
      'verify-success',
      'user-type',
      'b2b-selection',
    ],
  },
  { title: 'Agent', screens: ['agent-step1', 'agent-step2', 'agent-step3'] },
  { title: 'Owner/Landlord', screens: ['owner-step1', 'owner-step2', 'owner-step3'] },
  { title: 'Developer', screens: ['developer-step1', 'developer-step2', 'developer-step3', 'developer-step4'] },
  { title: 'Service Provider', screens: ['service-step1', 'service-step2', 'service-step3'] },
  { title: 'Lifestyle/Experience', screens: ['lifestyle-step1', 'lifestyle-step2', 'lifestyle-step3'] },
  { title: 'Investment Partner', screens: ['invest-step1', 'invest-step2', 'invest-step3'] },
  {
    title: 'App & Marketplace',
    screens: [
      'home',
      'inbox',
      'search',
      'wallet',
      'transactions',
      'profile',
      'promotions',
      'invest-dashboard',
      'create-investment',
      'property-detail',
      'experience-detail',
      'investment-detail',
      'service-detail',
      'booking-flow',
      'booking-shortlet',
    ],
  },
]

const screenOrder: Screen[] = screenFlows.flatMap((f) => f.screens)

const icons = {
  back: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.75 19.5 8.25 12l7.5-7.5"
        stroke="#111"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6.75A1.75 1.75 0 0 1 5.75 5h12.5A1.75 1.75 0 0 1 20 6.75v10.5A1.75 1.75 0 0 1 18.25 19H5.75A1.75 1.75 0 0 1 4 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m5 7 6.51 4.262a1.5 1.5 0 0 0 1.64 0L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 10V7.5A3 3 0 0 1 12 4.5 3 3 0 0 1 15 7.5V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M2.75 12s3.25-6.25 9.25-6.25 9.25 6.25 9.25 6.25-3.25 6.25-9.25 6.25S2.75 12 2.75 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  eyeOff: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="m4 4 16 16M9.5 9.5c.7-.67 1.61-1 2.5-1 2 0 3.75 1.75 3.75 3.75 0 .88-.32 1.8-1 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.197 7.35C3.293 9.056 2.25 12 2.25 12s3.25 6.25 9.25 6.25c1.17 0 2.214-.2 3.147-.54M15.91 9.1C14.953 7.85 13.57 6.75 11.5 6.75c-.688 0-1.34.145-1.942.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  google: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 12.227c0-.7-.063-1.367-.18-2.007H12v3.796h5.402a4.61 4.61 0 0 1-2.004 3.026v2.515h3.238c1.896-1.744 2.964-4.313 2.964-7.33Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.964-.893 6.619-2.436l-3.238-2.514c-.9.6-2.05.955-3.381.955-2.6 0-4.807-1.758-5.591-4.122H3.04v2.59C4.686 19.983 8.074 22 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.409 13.883A5.81 5.81 0 0 1 6.1 12c0-.655.112-1.29.309-1.883V7.527H3.04A9.987 9.987 0 0 0 2 12c0 1.612.387 3.137 1.04 4.473l3.37-2.59Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.182c1.47 0 2.788.506 3.825 1.498l2.868-2.868C16.962 2.93 14.7 2 12 2 8.074 2 4.686 4.017 3.04 7.527l3.37 2.59C7.193 7.94 9.4 6.182 12 6.182Z"
        fill="#EA4335"
      />
    </svg>
  ),
  apple: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M16.76 4.26c-.96 1.13-1.6 2.7-1.45 4.26 1.4.11 2.84-.77 3.74-1.9.9-1.11 1.54-2.67 1.36-4.22-1.45.06-3.02.97-3.65 1.86Z"
        fill="#fff"
      />
      <path
        d="M20.54 15.42c-.05-.1-1.64-.64-1.69-2.52-.03-1.59 1.23-2.35 1.29-2.39-.7-1.02-1.78-1.15-2.16-1.16-.89-.09-1.73.51-2.18.51-.45 0-1.15-.5-1.9-.49-.97.02-1.86.56-2.36 1.41-1 1.68-.25 4.17.71 5.53.49.73 1.08 1.54 1.86 1.51.74-.03 1.02-.49 1.92-.49.89 0 1.15.49 1.9.48.79-.01 1.29-.74 1.77-1.47.56-.82.8-1.62.82-1.68Z"
        fill="#fff"
      />
    </svg>
  ),
  notch: <div style={{ width: 0, height: 0 }} />,
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="m4.5 9 7.5-5 7.5 5V19a1 1 0 0 1-1 1h-4.5v-6h-4v6H5.5a1 1 0 0 1-1-1V9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  inbox: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 6.5A1.5 1.5 0 0 1 6 5h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 19h-2.5l-1.25-2.5h-4.5L8.5 19H6a1.5 1.5 0 0 1-1.5-1.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.5 12 12l6-5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m15.5 15.5 3.75 3.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  wallet: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3.75"
        y="6"
        width="16.5"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20.25 10.5h-2.75a1.25 1.25 0 0 0 0 2.5h2.75V10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  profile: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.75 19c0-2.485 2.35-4.5 5.25-4.5s5.25 2.015 5.25 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  id: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h4M8 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="11.5" r="1.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14.75 15.5c.3-.7.9-1.25 1.7-1.25.8 0 1.4.55 1.8 1.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  check: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
}

type InputProps = {
  placeholder: string
  value?: string
  type?: 'text' | 'password'
  active?: boolean
  secure?: boolean
  error?: string
}

const InputField = ({ placeholder, value, type = 'text', active, secure, error }: InputProps) => {
  const rightIcon = type === 'password' ? (secure ? icons.eyeOff : icons.eye) : null
  const icon = type === 'password' ? icons.lock : icons.mail
  const stateClass = error ? 'error' : active ? 'active' : ''
  return (
    <>
      <div className={`input-shell ${stateClass}`}>
        <span className="input-icon">{icon}</span>
        <input
          type={secure ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          readOnly
        />
        {rightIcon ? <span className="password-toggle">{rightIcon}</span> : null}
      </div>
      {error ? <div className="error-text">{error}</div> : null}
    </>
  )
}

type PrimaryButtonProps = { label: string; filled?: boolean; disabled?: boolean; onClick?: () => void }

const PrimaryButton = ({ label, filled, disabled, onClick }: PrimaryButtonProps) => (
  <button
    className={`primary-btn ${disabled ? 'disabled' : filled ? 'filled' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
)

const SocialButton = ({ provider }: { provider: 'google' | 'apple' }) => (
  <button className="social-btn">
    {provider === 'google' ? icons.google : icons.apple}
    <span>Continue with {provider === 'google' ? 'Google' : 'Apple'}</span>
  </button>
)

const StatusBar = () => (
  <div className="status-bar">
    <span>9:41</span>
    <div />
  </div>
)

const TopBar = ({
  showBack,
  showLogo,
  trailing,
}: {
  showBack?: boolean
  showLogo?: boolean
  trailing?: ReactNode
}) => (
  <div className="nav-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
    <div style={{ width: 40 }}>{showBack ? <div className="back-btn">{icons.back}</div> : null}</div>
    <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
      {showLogo ? <img src={logoBlack} alt="Dwell" style={{ height: 26 }} /> : null}
    </div>
    <div style={{ width: 40, textAlign: 'right' }}>{trailing ?? <span />}</div>
  </div>
)

const SplashScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '844px',
      background: accent,
      color: '#fff',
      gap: 24,
    }}
  >
    <img src={logoWhiteVertical} alt="Dwell" style={{ height: 160 }} />
    <PrimaryButton label="Get Started" filled onClick={onContinue} />
  </div>
)

type NavKey = 'home' | 'inbox' | 'search' | 'wallet' | 'profile'

const MaskIcon = ({ src, active }: { src: string; active: boolean }) => (
  <span
    style={{
      width: 22,
      height: 22,
      display: 'inline-block',
      backgroundColor: active ? accent : '#bcbcbc',
      WebkitMask: `url("${src}") no-repeat center / contain`,
      mask: `url("${src}") no-repeat center / contain`,
    }}
  />
)

const BottomNav = ({ active, onSelect }: { active: NavKey; onSelect: (key: NavKey) => void }) => {
  const items: { key: NavKey; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: homeIcon },
    { key: 'inbox', label: 'Inbox', icon: inboxIcon },
    { key: 'search', label: 'Search', icon: searchIcon },
    { key: 'wallet', label: 'Wallet', icon: walletIcon },
    { key: 'profile', label: 'Profile', icon: profileIcon },
  ]
  return (
    <div>
      <div className="bottom-nav">
        {items.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${item.key === active ? 'active' : ''}`}
            onClick={() => onSelect(item.key)}
          >
            <div className="nav-icon">
              <MaskIcon src={item.icon} active={item.key === active} />
            </div>
            <div>{item.label}</div>
          </div>
        ))}
      </div>
      <div className="pill-indicator" />
    </div>
  )
}

const OnboardingScreen = ({ mode }: { mode: Screen }) => {
  const isLogin = mode === 'login'
  const state = useMemo(() => {
    switch (mode) {
      case 'signup-email':
        return { email: 'valerieu@gmail.', password: '', button: 'active' as const }
      case 'signup-filled':
        return { email: 'valerieu@gmail.com', password: '••••••••••', button: 'active' as const, strength: 0.9 }
      case 'signup-weak':
        return { email: 'valerieu@gmail.com', password: 'abc123', button: 'disabled' as const, strength: 0.35 }
      case 'signup-error':
        return { email: 'valerieu@gmail', password: 'weak', button: 'disabled' as const, error: 'Enter a valid email address' }
      case 'login':
        return { email: 'valerieu@gmail.com', password: '••••••••', button: 'active' as const }
      default:
        return { email: '', password: '', button: 'disabled' as const }
    }
  }, [mode])

  const heading = isLogin ? 'Log in to Dwell' : 'Sign up to Dwell'
  const sub = 'Browse and reserve short lets with ease in Nigeria!'
  const ctaLabel = isLogin ? 'Log In' : 'Sign up to Dwell'

  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>

      <div className="heading-block">
        <h1>{heading}</h1>
        <p>{sub}</p>
      </div>

      <div className="link">Use phone number instead</div>

      <div className="form">
        <InputField
          placeholder="Email Address"
          value={state.email}
          active={!!state.email}
          type="text"
          error={state.error}
        />
        <InputField
          placeholder="Password"
          value={state.password}
          active={!!state.password}
          type="password"
          secure={!!state.password}
        />
        {!isLogin && state.password ? (
          <div className="strength">
            <span>Password strength</span>
            <div className="strength-rail">
              <div
                className="strength-fill"
                style={{ width: `${Math.round((state.strength ?? 0.4) * 100)}%` }}
              />
            </div>
            <span>{(state.strength ?? 0.4) > 0.6 ? 'Strong' : 'Weak'}</span>
          </div>
        ) : null}
        {!isLogin ? (
          <div style={{ fontSize: 12, color: '#6f6f6f', marginTop: -4 }}>
            Use 8+ characters with upper/lowercase, numbers, and a special character.
          </div>
        ) : null}
        <PrimaryButton
          label={ctaLabel}
          filled={state.button === 'active'}
          disabled={state.button === 'disabled'}
        />
      </div>

      <div className="text-row">
        <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
        <span className="link">{isLogin ? 'Sign Up' : 'Log In'}</span>
      </div>

      <div className="divider">OR</div>

      <div className="form">
        <SocialButton provider="google" />
        <SocialButton provider="apple" />
      </div>

      <div className="footer-copy">
        By signing in, you agree to Dwell&apos;s Terms and Conditions and Community Guidelines.{' '}
        <span className="privacy-link">Read Privacy Policy</span>
      </div>
    </div>
  )
}

const EmailVerification = ({ canResend = false, timeLeft = 45 }: { canResend?: boolean; timeLeft?: number }) => {
  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>

      <div className="heading-block">
        <h1>Verify your email</h1>
        <p>We&apos;ve sent a verification code to valerieu@gmail.com</p>
      </div>

      <div className="otp-boxes">
        {['1', '2', '3', '4', '5', '6'].map((d, i) => (
          <div key={i} className={`otp-box ${i < 4 ? 'filled' : ''}`}>
            {i < 4 ? d : ''}
          </div>
        ))}
      </div>

      <div className="meta-row">
        <span>Code expires in</span>
        <span className="pill-timer">00:{String(timeLeft).padStart(2, '0')}</span>
      </div>

      <PrimaryButton label="Verify Email" filled />

      <div className="text-row" style={{ marginTop: -4 }}>
        <span>Didn&apos;t get the code?</span>
        <span className="link">
          {canResend ? 'Resend code' : `Resend in 0:${String(timeLeft).padStart(2, '0')}`}
        </span>
      </div>

      <div className="text-row" style={{ marginTop: -10 }}>
        <span>Wrong email?</span>
        <span className="link">Change Email</span>
      </div>
    </div>
  )
}

const OtpVerification = ({ canResend = false, timeLeft = 55 }: { canResend?: boolean; timeLeft?: number }) => {
  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>

      <div className="heading-block">
        <h1>Verify Phone Number</h1>
        <p>Enter the OTP sent to +234 ••• •• ••321</p>
      </div>

      <div className="otp-boxes">
        {['8', '4', '0', '2', '5', ''].map((d, i) => (
          <div key={i} className={`otp-box ${d ? 'filled' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="meta-row">
        <span>Expires in</span>
        <span className="pill-timer">00:{String(timeLeft).padStart(2, '0')}</span>
      </div>

      <PrimaryButton label="Verify Phone Number" filled />

      <div className="text-row" style={{ marginTop: -4 }}>
        <span>Didn&apos;t get the code?</span>
        <span className="link">
          {canResend ? 'Resend code' : `Resend in 0:${String(timeLeft).padStart(2, '0')}`}
        </span>
      </div>
    </div>
  )
}

const UserTypeSelection = () => {
  const cards = [
    {
      title: 'Finding a Property',
      sub: 'For renters, buyers, or short-stay guests looking for verified options.',
      active: true,
    },
    {
      title: 'Property Investment',
      sub: 'Access fractional ownership and real estate investment opportunities.',
      active: false,
    },
    {
      title: 'List My Property or Service',
      sub: 'For owners, agents, and service providers to reach the right customers.',
      active: false,
    },
  ]
  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>

      <div className="heading-block">
        <h1>How will you use Dwell?</h1>
        <p>Select your primary reason for joining Dwell</p>
      </div>

      <div className="form">
        {cards.map((card) => (
          <div key={card.title} className={`radio-card ${card.active ? 'active' : ''}`}>
            <div className="radio-dot" />
            <div className="radio-text">
              <div className="radio-title">{card.title}</div>
              <div className="radio-sub">{card.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <PrimaryButton label="Continue" filled />
    </div>
  )
}

const B2BSelection = () => {
  const options = [
    'Real Estate Agent',
    'Property Owner/Landlord',
    'Property Developer',
    'Service Provider',
    'Lifestyle & Experience Partner',
    'Investment Partner',
  ]
  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>
      <div className="heading-block">
        <h1>Join the Dwell Business Community</h1>
        <p>Tell us about your business so we can connect you with the right customers</p>
      </div>

      <div className="form">
        {options.map((label, idx) => (
          <div key={label} className={`radio-card ${idx === 0 ? 'active' : ''}`}>
            <div className="radio-dot" />
            <div className="radio-text">
              <div className="radio-title">{label}</div>
              <div className="radio-sub">Tap to select this business type.</div>
            </div>
          </div>
        ))}
      </div>

      <PrimaryButton label="Continue" filled />
    </div>
  )
}

const AccountSuccess = () => {
  return (
    <div className="screen center">
      <div className="nav-row" style={{ justifyContent: 'space-between' }}>
        <div />
        {icons.notch}
        <div />
      </div>
      <div className="success-hero">
        <div className="checkmark">{icons.check}</div>
      </div>
      <div className="heading-block">
        <h1 style={{ marginTop: 12 }}>Account Created Successfully!</h1>
        <p>Let&apos;s personalize your Dwell experience</p>
      </div>
      <PrimaryButton label="Continue" filled />
    </div>
  )
}

const LoginOtp = ({ timeLeft = 50 }: { timeLeft?: number }) => {
  return (
    <div className="screen">
      <div className="nav-row">
        <div className="back-btn">{icons.back}</div>
        {icons.notch}
      </div>

      <div className="heading-block">
        <h1>Authentication Required</h1>
        <p>Enter the verification code sent to +234 ••• •• ••321</p>
      </div>

      <div className="otp-boxes">
        {['3', '6', '1', '9', '', ''].map((d, i) => (
          <div key={i} className={`otp-box ${d ? 'filled' : ''}`}>
            {d}
          </div>
        ))}
      </div>

      <div className="meta-row">
        <span>Expires in</span>
        <span className="pill-timer">00:{String(timeLeft).padStart(2, '0')}</span>
      </div>

      <PrimaryButton label="Verify Code" filled />

      <div className="text-row" style={{ marginTop: -4 }}>
        <span>Didn&apos;t get the code?</span>
        <span className="link">Resend in 40s</span>
      </div>
      <div className="text-row" style={{ marginTop: -10 }}>
        <span>Need help?</span>
        <span className="link">Contact Support</span>
      </div>
    </div>
  )
}

const StepShell = ({
  title,
  sub,
  step,
  total,
  children,
}: {
  title: string
  sub: string
  step: number
  total: number
  children: ReactNode
}) => (
  <div className="screen">
    <TopBar showBack />
    <div className="progress">
      <div className="pill">
        Step {step} of {total}
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
    <div className="heading-block">
      <h1>{title}</h1>
      <p>{sub}</p>
    </div>
    {children}
  </div>
)

const VerifyMethod = () => (
  <div className="screen">
    <TopBar showBack />
    <div className="heading-block">
      <h1>Choose Verification Method</h1>
      <p>Select your preferred identification document</p>
    </div>
    <div className="form">
      {['National Identity Number (NIN)', 'Driver’s License', 'International Passport', 'BVN'].map(
        (label, idx) => (
          <div key={label} className={`radio-card ${idx === 0 ? 'active' : ''}`}>
            <div className="radio-dot" />
            <div className="radio-text">
              <div className="radio-title">{label}</div>
              <div className="radio-sub">Name must match your account details.</div>
            </div>
          </div>
        ),
      )}
    </div>
    <PrimaryButton label="Continue" filled />
  </div>
)

const VerifyProcessing = () => (
  <div className="screen center">
    <TopBar />
    <div className="success-hero">
      <div className="checkmark" style={{ background: '#111' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8Z"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <path
            d="m8.75 12 2.25 2.25L15.25 10"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
    <div className="heading-block">
      <h1>Verifying your identity</h1>
      <p>This may take a few moments</p>
    </div>
    <div className="section">
      {['Document received', 'Information extraction', 'Verification check', 'Final confirmation'].map(
        (item, idx) => (
          <div key={item} className="list-line">
            {idx < 2 ? '✅ ' : '⏳ '}
            {item}
          </div>
        ),
      )}
    </div>
    <div className="text-row">
      <span>Need to edit?</span>
      <span className="link">Cancel</span>
    </div>
  </div>
)

const VerifySuccess = () => (
  <div className="screen center">
    <TopBar />
    <div className="success-hero">
      <div className="checkmark">{icons.check}</div>
    </div>
    <div className="heading-block">
      <h1>Identity Verification Successful!</h1>
      <p>Your identity has been verified successfully</p>
    </div>
    <PrimaryButton label="Continue" filled />
  </div>
)

const AgentStep1 = () => (
  <StepShell
    title="Real Estate Agent Profile"
    sub="Let’s set up your professional profile"
    step={1}
    total={3}
  >
    <div className="section">
      <div className="label">Full Name</div>
      <InputField placeholder="Full Name" value="Valerieu Gomez" active />
      <div className="label">Agency Name</div>
      <InputField placeholder="Agency Name" value="Lagos Realty" active />
      <div className="label">License Number</div>
      <InputField placeholder="License Number" value="AGT-3345-21" active />
      <div className="label">Issuing Authority</div>
      <InputField placeholder="Issuing Authority" value="Lagos State" active />
    </div>
    <div className="section">
      <div className="label">Years of Experience</div>
      <div className="chip-row">
        {['0-2', '3-5', '6-10', '10+'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 2 ? 'active' : ''}`}>
            {c} yrs
          </div>
        ))}
      </div>
      <div className="label">Specialization Areas</div>
      <div className="chip-row">
        {['Residential', 'Commercial', 'Luxury', 'Land', 'Short Lets'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Regions/Cities</div>
      <div className="chip-row">
        {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <PrimaryButton label="Continue" filled />
    <div className="text-row">
      <span>Save and complete later</span>
    </div>
  </StepShell>
)

const AgentStep2 = () => (
  <StepShell
    title="Professional Details"
    sub="Add your story and references"
    step={2}
    total={3}
  >
    <div className="section">
      <div className="label">Professional Biography</div>
      <div className="upload-tile" style={{ height: 100 }}>
        430 / 500 characters
      </div>
      <div className="label">Professional References (add up to 3)</div>
      <div className="list-line">Reference Name — Company — Contact</div>
      <div className="list-line">Reference Name — Company — Contact</div>
      <div className="label">Languages Spoken</div>
      <div className="chip-row">
        {['English', 'Yoruba', 'Hausa', 'Igbo'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="text-row">
      <span className="link">Back</span>
      <PrimaryButton label="Continue" filled />
      <span className="link">Save Draft</span>
    </div>
  </StepShell>
)

const AgentStep3 = () => (
  <StepShell
    title="Verification & Documentation"
    sub="Upload documents to verify your profile"
    step={3}
    total={3}
  >
    <div className="section">
      <div className="label">Professional Headshot</div>
      <div className="upload-tile">
        <span>🧑‍💼</span>
        <span>Upload image</span>
      </div>
      <div className="label">Agent License Document</div>
      <div className="upload-tile">
        <span>📄</span>
        <span>Upload PDF/JPG/PNG</span>
      </div>
      <div className="label">Identity Document</div>
      <div className="upload-tile">
        <span>🪪</span>
        <span>Upload ID</span>
      </div>
    </div>
    <div className="chip-row">
      {['I confirm information is accurate', 'Accept terms for professionals', 'Accept commission structure'].map(
        (c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`} style={{ flexBasis: '100%' }}>
            {c}
          </div>
        ),
      )}
    </div>
    <div className="text-row">
      <span className="link">Back</span>
      <PrimaryButton label="Complete Profile" filled />
      <span className="link">Save Draft</span>
    </div>
  </StepShell>
)

const OwnerStep1 = () => (
  <StepShell
    title="Property Owner Profile"
    sub="Tell us about yourself and your properties"
    step={1}
    total={3}
  >
    <div className="section">
      <div className="label">Full Name</div>
      <InputField placeholder="Full Name" value="Mr. Okafor" active />
      <div className="label">Contact Information</div>
      <InputField placeholder="Email" value="okafor@dwell.ng" active />
      <InputField placeholder="Phone" value="+234 801 222 3344" active />
      <div className="label">Number of Properties Owned</div>
      <div className="chip-row">
        {['1-2', '3-5', '6-10', '10+'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 1 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="section">
      <div className="label">Property Types</div>
      <div className="chip-row">
        {['Apartments', 'Houses', 'Commercial', 'Land', 'Mixed-Use'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Locations</div>
      <div className="chip-row">
        {['Lekki', 'Ikoyi', 'Yaba', 'Abuja'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Management Approach</div>
      <div className="chip-row">
        {['Self-managed', 'Through Agency', 'Hybrid'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <PrimaryButton label="Continue" filled />
    <div className="text-row">
      <span>Save and complete later</span>
    </div>
  </StepShell>
)

const OwnerStep2 = () => (
  <StepShell
    title="Management Preferences"
    sub="Share who you rent to and services you want"
    step={2}
    total={3}
  >
    <div className="section">
      <div className="label">Tenant Preferences</div>
      <div className="chip-row">
        {['Families', 'Professionals', 'Students', 'Expatriates'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Lease Term Preferences</div>
      <div className="chip-row">
        {['Short-term', 'Medium-term', 'Long-term'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Additional Services</div>
      <div className="chip-row">
        {[
          'Property Management',
          'Maintenance Services',
          'Tenant Screening',
          'Rent Collection',
          'Legal Services',
          'Interior Design',
        ].map((c, idx) => (
          <div key={c} className={`chip ${idx < 3 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="text-row">
      <span className="link">Back</span>
      <PrimaryButton label="Continue" filled />
      <span className="link">Save Draft</span>
    </div>
  </StepShell>
)

const OwnerStep3 = () => (
  <StepShell
    title="Verification & Documentation"
    sub="Upload property ownership and ID"
    step={3}
    total={3}
  >
    <div className="section">
      <div className="label">Property Ownership Documents</div>
      <div className="upload-tile">
        <span>🏠</span>
        <span>Upload property document</span>
      </div>
      <div className="label">Identity Document</div>
      <div className="upload-tile">
        <span>🪪</span>
        <span>Upload ID</span>
      </div>
      <div className="label">Tax Identification Number</div>
      <InputField placeholder="Tax ID" value="TIN-234-884" active />
    </div>
    <div className="chip-row">
      {['Information accurate', 'Property listing terms', 'Accept commission structure'].map(
        (c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`} style={{ flexBasis: '100%' }}>
            {c}
          </div>
        ),
      )}
    </div>
    <div className="text-row">
      <span className="link">Back</span>
      <PrimaryButton label="Complete Profile" filled />
      <span className="link">Save Draft</span>
    </div>
  </StepShell>
)

const DeveloperStep1 = () => (
  <StepShell
    title="Developer Company Profile"
    sub="Tell us about your development company"
    step={1}
    total={4}
  >
    <div className="section">
      <div className="label">Company Name</div>
      <InputField placeholder="Company Name" value="Landmark Construction" active />
      <div className="label">Year Established</div>
      <InputField placeholder="Year" value="2013" active />
      <div className="label">Registration Number</div>
      <InputField placeholder="Registration Number" value="RC-002341" active />
      <div className="label">Company Size</div>
      <div className="chip-row">
        {['1-10', '11-50', '51-200', '200+'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Company Logo</div>
      <div className="upload-tile">Upload Logo</div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const DeveloperStep2 = () => (
  <StepShell
    title="Development Portfolio"
    sub="Show completed projects and specialties"
    step={2}
    total={4}
  >
    <div className="section">
      <div className="label">Completed Projects</div>
      <div className="list-line">12 projects listed</div>
      <div className="label">Types of Developments</div>
      <div className="chip-row">
        {['Residential', 'Commercial', 'Mixed-use', 'Industrial'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 3 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Geographical Areas</div>
      <div className="chip-row">
        {['Lagos', 'Abuja', 'PH'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Portfolio Showcase</div>
      <div className="upload-tile">Add up to 5 projects</div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const DeveloperStep3 = () => (
  <StepShell
    title="Current Projects & Partnerships"
    sub="Add active projects and partnership interests"
    step={3}
    total={4}
  >
    <div className="section">
      <div className="label">Current Projects</div>
      <div className="list-line">The Cove Towers — Victoria Island — Completion: Q4</div>
      <div className="list-line">Harbor View — Ikoyi — Completion: Q2</div>
      <div className="label">Partnership Interests</div>
      <div className="chip-row">
        {[
          'Seeking Investors',
          'Joint Venture Partners',
          'Land Acquisition',
          'Construction Partners',
          'Sales Partners',
        ].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const DeveloperStep4 = () => (
  <StepShell
    title="Verification & Documentation"
    sub="Upload required business documents"
    step={4}
    total={4}
  >
    <div className="section">
      <div className="label">Company Registration Documents</div>
      <div className="upload-tile">
        <span>🏢</span>
        <span>Upload registration PDF</span>
      </div>
      <div className="label">Tax Identification Documents</div>
      <div className="upload-tile">
        <span>🧾</span>
        <span>Upload TIN</span>
      </div>
      <div className="label">Project Approval Documents</div>
      <div className="upload-tile">
        <span>📂</span>
        <span>Upload approvals</span>
      </div>
    </div>
    <div className="chip-row">
      {['Information accurate', 'Developer terms', 'Accept fees'].map((c, idx) => (
        <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`} style={{ flexBasis: '100%' }}>
          {c}
        </div>
      ))}
    </div>
    <PrimaryButton label="Complete Profile" filled />
  </StepShell>
)

const ServiceStep1 = () => (
  <StepShell
    title="Service Provider Profile"
    sub="Tell us about your business"
    step={1}
    total={3}
  >
    <div className="section">
      <div className="label">Service Type</div>
      <div className="chip-row">
        {['Maintenance', 'Cleaning', 'Interior Design', 'Home Security', 'Legal Services'].map(
          (c, idx) => (
            <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
              {c}
            </div>
          ),
        )}
      </div>
      <div className="label">Business Name</div>
      <InputField placeholder="Company/Business Name" value="Uche Maintenance" active />
      <div className="label">Year Established</div>
      <InputField placeholder="Year" value="2018" active />
      <div className="label">Contact</div>
      <InputField placeholder="Phone" value="+234 801 222 3344" active />
      <InputField placeholder="Email" value="hello@uche.ng" active />
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const ServiceStep2 = () => (
  <StepShell
    title="Service Details"
    sub="Define coverage and availability"
    step={2}
    total={3}
  >
    <div className="section">
      <div className="label">Services Offered</div>
      <div className="chip-row">
        {['Electrical', 'Plumbing', 'HVAC', 'Carpentry'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 3 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Service Areas</div>
      <div className="chip-row">
        {['Lekki', 'Ajah', 'VI', 'Ikoyi'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 3 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Availability</div>
      <div className="list-line">Mon - Sat, 8:00am - 6:00pm</div>
      <div className="label">Pricing Model</div>
      <div className="chip-row">
        {['Hourly', 'Fixed price', 'Project-based', 'Custom Quote'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const ServiceStep3 = () => (
  <StepShell
    title="Credentials & Portfolio"
    sub="Show your work and certifications"
    step={3}
    total={3}
  >
    <div className="section">
      <div className="label">Years in Business</div>
      <div className="chip-row">
        {['0-2', '3-5', '6-10', '10+'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 1 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Certifications & Licenses</div>
      <div className="upload-tile">
        <span>🏅</span>
        <span>Upload certifications</span>
      </div>
      <div className="label">Portfolio Showcase</div>
      <div className="upload-tile">
        <span>🖼️</span>
        <span>Add up to 10 works</span>
      </div>
    </div>
    <PrimaryButton label="Complete Profile" filled />
  </StepShell>
)

const LifestyleStep1 = () => (
  <StepShell
    title="Lifestyle & Experience Profile"
    sub="Tell us about your business"
    step={1}
    total={3}
  >
    <div className="section">
      <div className="label">Experience Type</div>
      <div className="chip-row">
        {['Restaurant/Café', 'Gym/Fitness', 'Spa/Wellness', 'Event Venue', 'Tours & Experiences'].map(
          (c, idx) => (
            <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
              {c}
            </div>
          ),
        )}
      </div>
      <div className="label">Establishment Name</div>
      <InputField placeholder="Name" value="Folake Brunch Club" active />
      <div className="label">Contact</div>
      <InputField placeholder="Email" value="hi@brunchclub.ng" active />
      <InputField placeholder="Phone" value="+234 809 555 2222" active />
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const LifestyleStep2 = () => (
  <StepShell
    title="Experience Details"
    sub="Add operating hours and features"
    step={2}
    total={3}
  >
    <div className="section">
      <div className="label">Location Address</div>
      <InputField placeholder="Address" value="Lekki Phase 1, Lagos" active />
      <div className="label">Special Features</div>
      <div className="chip-row">
        {['Live Music', 'Outdoor Seating', 'Waterfront', 'Parking'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 3 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Operating Hours</div>
      <div className="list-line">Mon - Sun: 9am - 11pm</div>
      <div className="label">Photo Gallery</div>
      <div className="upload-tile">Upload up to 10 photos</div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const LifestyleStep3 = () => (
  <StepShell
    title="Verification & Partnerships"
    sub="Add licenses and offers"
    step={3}
    total={3}
  >
    <div className="section">
      <div className="label">Business Licenses & Certifications</div>
      <div className="upload-tile">
        <span>📜</span>
        <span>Upload certificates</span>
      </div>
      <div className="label">Partnership Opportunities</div>
      <div className="chip-row">
        {['Special offers for Dwell users', 'Exclusive experiences', 'Cross-promotion'].map(
          (c, idx) => (
            <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
              {c}
            </div>
          ),
        )}
      </div>
      <div className="label">Booking Preferences</div>
      <div className="list-line">Advance notice: 24 hours | Cancellation: Flexible</div>
    </div>
    <PrimaryButton label="Complete Profile" filled />
  </StepShell>
)

const InvestStep1 = () => (
  <StepShell
    title="Investment Partner Profile"
    sub="Tell us about your investment business"
    step={1}
    total={3}
  >
    <div className="section">
      <div className="label">Company/Individual Name</div>
      <InputField placeholder="Name" value="Ibadan Investment Club" active />
      <div className="label">Investment Entity Type</div>
      <div className="chip-row">
        {['Individual', 'Company', 'Fund'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Contact</div>
      <InputField placeholder="Email" value="invest@iic.ng" active />
      <InputField placeholder="Phone" value="+234 811 300 2222" active />
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const InvestStep2 = () => (
  <StepShell
    title="Investment Preferences"
    sub="Choose focus and geography"
    step={2}
    total={3}
  >
    <div className="section">
      <div className="label">Investment Focus</div>
      <div className="chip-row">
        {[
          'Residential Development',
          'Commercial Properties',
          'Land Banking',
          'Property Flipping',
          'Rental Income',
        ].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Preferred Investment Size</div>
      <div className="list-line">₦10M - ₦250M</div>
      <div className="label">Geographical Preferences</div>
      <div className="chip-row">
        {['Lagos', 'Abuja', 'Port Harcourt'].map((c, idx) => (
          <div key={c} className={`chip ${idx < 2 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Risk Tolerance</div>
      <div className="chip-row">
        {['Low', 'Medium', 'High'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 1 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <PrimaryButton label="Continue" filled />
  </StepShell>
)

const InvestStep3 = () => (
  <StepShell
    title="Verification & Financial Details"
    sub="Provide documents and confirmations"
    step={3}
    total={3}
  >
    <div className="section">
      <div className="label">Funding Availability Timeline</div>
      <div className="list-line">Ready in 30 days</div>
      <div className="label">Expected ROI Target</div>
      <div className="list-line">12-18% annually</div>
      <div className="label">Documents</div>
      <div className="upload-tile">
        <span>💰</span>
        <span>Upload proof of funds</span>
      </div>
      <div className="upload-tile">
        <span>🏢</span>
        <span>Upload entity registration</span>
      </div>
    </div>
    <PrimaryButton label="Complete Profile" filled />
  </StepShell>
)

const HomeTab = ({
  onSelectDetail,
  onNavigate,
}: {
  onSelectDetail: (item: DetailItem) => void
  onNavigate: (s: Screen) => void
}) => (
  <div className="screen">
    <TopBar showLogo trailing={<span style={{ fontSize: 18 }}>⋯</span>} />

    <div className="section" style={{ border: 'none', padding: 0, gap: 10 }}>
      <div className="meta-row" style={{ gap: 10, fontSize: 13, color: '#111' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: accent }}>📍</span>
          <span>Current Location</span>
        </span>
        <span className="link">Change Location</span>
      </div>
      <div style={{ color: '#111', fontWeight: 700, fontSize: 16 }}>
        Ilashe, Lekki Phase 1
      </div>
      <div className="input-shell clickable" style={{ marginTop: 4 }}>
        <span className="input-icon">🔍</span>
        <input placeholder="Search any location" readOnly />
      </div>
      <div className="chip-row">
        {['All', 'Rent', 'Sale', 'Short Let', 'Experiences', 'Investments'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>

    <div className="section" style={{ background: '#fff7fb' }}>
      <div className="label">Complete your profile ✂️</div>
      <div className="list-line" style={{ borderBottom: 'none', padding: 0 }}>
        Tap to complete your profile. You&apos;ll be able to enjoy Dwell&apos;s features if you do!
      </div>
      <div className="pill" style={{ alignSelf: 'flex-start', background: '#ffe7ee', color: accent }}>
        2/4
      </div>
    </div>

    {renderHomeSection('Promoted', propertyImages.slice(0, 3), (img) => {
      onSelectDetail({ type: 'property', title: 'Hov Beach Resort', img, price: '₦125,000 / night' })
      onNavigate('property-detail')
    })}
    {renderHomeSection('Highest Ratings', propertyImages.slice(2, 5), (img) => {
      onSelectDetail({ type: 'property', title: 'Ikoyi Garden Suites', img, price: '₦520k / month' })
      onNavigate('property-detail')
    })}
    {renderHomeSection('New', propertyImages.slice(1, 4), (img) => {
      onSelectDetail({ type: 'property', title: 'Victoria Island Loft', img, price: '₦420k / month' })
      onNavigate('property-detail')
    })}
    {renderHomeSection('Best Hosts', propertyImages.slice(0, 2), (img) => {
      onSelectDetail({ type: 'property', title: 'Host Collection', img, price: '₦300k / month' })
      onNavigate('property-detail')
    })}
    {renderHomeSection('Based on Location', propertyImages.slice(3, 5), (img) => {
      onSelectDetail({ type: 'property', title: 'Lekki Picks', img, price: '₦280k / month' })
      onNavigate('property-detail')
    })}
    {renderHomeSection('Favorites', propertyImages.slice(0, 2), (img) => {
      onSelectDetail({ type: 'property', title: 'Saved Stay', img, price: '₦200k / month' })
      onNavigate('property-detail')
    })}

    <HorizontalSection
      title="Experiences near you"
      tag="Experience"
      onSelect={(item) => {
        onSelectDetail({ type: 'experience', ...item })
        onNavigate('experience-detail')
      }}
      items={experienceImages.map((img, idx) => ({
        img,
        title: idx % 2 === 0 ? 'Sunday Brunch Lagoon' : 'Live Music Night',
        price: idx % 2 === 0 ? '₦25,000' : '₦18,000',
        meta: 'Food & Vibes',
        icon: idx % 2 === 0 ? '🍽️' : '🎵',
        date: '02/03/2026',
      }))}
    />

    <HorizontalSection
      title="Investment Opportunities"
      tag="Investment"
      onSelect={(item) => {
        onSelectDetail({ type: 'investment', ...item })
        onNavigate('investment-detail')
      }}
      items={investImages.map((img, idx) => ({
        img,
        title: idx === 0 ? 'Lekki Waterfront Fund' : idx === 1 ? 'VI Offices REIT' : 'Ikoyi Flip',
        price: idx === 0 ? 'Min ₦100k • 14% ROI' : 'Min ₦500k • 18% ROI',
        meta: 'Funding open',
      }))}
    />
  </div>
)

const PropertyCard = ({
  img,
  title,
  price,
  rating = '4.8',
  reviews = '50',
  tag = 'Promoted',
  onSelect,
}: {
  img: string
  title: string
  price: string
  rating?: string
  reviews?: string
  tag?: string
  onSelect?: () => void
}) => (
  <div
    className="card clickable"
    style={{ display: 'flex', gap: 12, padding: 10, minWidth: '88%' }}
    onClick={onSelect}
  >
    <div
      style={{
        width: 110,
        minWidth: 110,
        height: 90,
        borderRadius: 10,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url('${img}')`,
      }}
    />
    <div className="body" style={{ padding: 0, flex: 1 }}>
      <div className="tag">{tag}</div>
      <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>{title}</div>
      <div className="meta-row">
        <span>⭐️ {rating} ({reviews} reviews)</span>
        <span>Posted by 👤</span>
      </div>
      <div className="meta-row" style={{ marginTop: 4 }}>
        <span>🛏️ 5</span>
        <span>🛁 5</span>
      </div>
      <div style={{ marginTop: 4, fontWeight: 700, color: '#111' }}>{price}</div>
    </div>
  </div>
)

const HomeListingCard = ({
  img,
  title,
  price,
  rating = '4.8',
  reviews = '50',
  tag = 'Promoted',
  onSelect,
}: {
  img: string
  title: string
  price: string
  rating?: string
  reviews?: string
  tag?: string
  onSelect?: () => void
}) => (
  <div
    className="card clickable"
    style={{
      minWidth: '88%',
      padding: 0,
      overflow: 'hidden',
      boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
      border: '1px solid #f1f1f1',
    }}
    onClick={onSelect}
  >
    <div
      className="img"
      style={{
        height: 200,
        backgroundImage: `url('${img}')`,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', top: 10, left: 10, background: '#fff', padding: '4px 8px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
        {tag}
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10, background: '#fff', padding: 6, borderRadius: '50%' }}>♡</div>
    </div>
    <div className="body" style={{ paddingTop: 10 }}>
      <div style={{ fontWeight: 700, color: '#111', fontSize: 15 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6f6f6f', fontSize: 12, marginTop: 4 }}>
        <span>⭐️ {rating} ({reviews} reviews)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, color: '#6f6f6f', fontSize: 12 }}>
        <span>Posted by</span>
        <span role="img" aria-label="host">🧑‍💼</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 6, color: '#6f6f6f', fontSize: 12 }}>
        <span>🛏️ 5</span>
        <span>🛁 5</span>
      </div>
      <div style={{ marginTop: 8, fontWeight: 800, color: '#111' }}>{price}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: accent }}>View Details</div>
    </div>
  </div>
)

const renderHomeSection = (title: string, imgs: string[], onSelect?: (img: string) => void) => (
  <div className="section">
    <div className="meta-row" style={{ justifyContent: 'space-between' }}>
      <div className="label" style={{ marginBottom: 0 }}>{title}</div>
      <span className="link">View all</span>
    </div>
    <div className="carousel">
      {imgs.map((img, idx) => (
        <HomeListingCard
          key={`${title}-${idx}`}
          img={img}
          title="Hov Beach Resort"
          price="₦125,000 / night"
          tag={title}
          onSelect={onSelect ? () => onSelect(img) : undefined}
        />
      ))}
    </div>
  </div>
)

const HorizontalSection = ({
  title,
  items,
  tag,
  onSelect,
}: {
  title: string
  tag: string
  items: { img: string; title: string; price: string; meta: string; icon?: string; date?: string }[]
  onSelect?: (item: { img: string; title: string; price: string; meta: string; icon?: string; date?: string }) => void
}) => (
  <div className="section">
    <div className="meta-row" style={{ justifyContent: 'space-between' }}>
      <div className="label" style={{ marginBottom: 0 }}>{title}</div>
      <span className="link">View all</span>
    </div>
    <div className="carousel">
      {items.map((item, idx) => (
        <div
          key={`${title}-${idx}`}
          className="card clickable"
          style={{ minWidth: '82%' }}
          onClick={onSelect ? () => onSelect(item) : undefined}
        >
          <div
            className="img"
            style={{ backgroundImage: `url('${item.img}')`, height: 150 }}
          />
          <div className="body" style={{ position: 'relative' }}>
            <div className="tag">{tag}</div>
            {item.icon ? (
              <span style={{ position: 'absolute', right: 8, top: 8, fontSize: 18 }}>{item.icon}</span>
            ) : null}
            <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>{item.title}</div>
            <div style={{ color: '#6f6f6f', fontSize: 13 }}>{item.meta}</div>
            {item.date ? (
              <div style={{ color: '#6f6f6f', fontSize: 12, marginTop: 4 }}>📅 {item.date}</div>
            ) : null}
            <div style={{ marginTop: 4, fontWeight: 700, color: '#111' }}>{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const ExploreTab = ({
  onSelectDetail,
  onNavigate,
}: {
  onSelectDetail: (item: DetailItem) => void
  onNavigate: (s: Screen) => void
}) => {
  const [filter, setFilter] = useState<string>('All')
  const items = [
    { type: 'Properties', title: 'Marina View Apartments', meta: '₦320k / month • Lekki', img: getPropertyImage(0), h: 220 },
    { type: 'Experiences', title: 'Sunday Brunch at the Lagoon', meta: '₦25k • Victoria Island', img: experienceImages[0], h: 260, date: '02/03/2026' },
    { type: 'Investments', title: 'Lekki Co-ownership', meta: 'Min ₦100k • 14% ROI', img: investImages[0], h: 230 },
    { type: 'Services', title: 'Uche Maintenance', meta: 'Electric + Plumbing • Lagos', img: serviceImages[0], h: 200 },
    { type: 'Properties', title: 'Ikoyi Garden Suites', meta: '₦520k / month', img: getPropertyImage(1), h: 260 },
    { type: 'Experiences', title: 'Live Music Night', meta: '₦18k • Ikoyi', img: experienceImages[1], h: 200, date: '05/04/2026' },
    { type: 'Investments', title: 'VI Offices REIT', meta: 'Min ₦500k • 18% ROI', img: investImages[1], h: 240 },
    { type: 'Promotions', title: 'Gold Promo Bundle', meta: '10% off boosts', img: exploreImages[6], h: 190 },
    { type: 'Services', title: 'Interior Design', meta: 'Bella Interiors • Lagos', img: serviceImages[2], h: 230 },
    { type: 'Properties', title: 'Banana Island Duplex', meta: '₦120M • For Sale', img: getPropertyImage(2), h: 250 },
    { type: 'Experiences', title: 'Chef’s Table', meta: '₦45k • Lekki', img: experienceImages[3], h: 210 },
    { type: 'Investments', title: 'Ikoyi Flip', meta: 'Min ₦750k • 22% ROI', img: investImages[2], h: 260 },
  ]

  const filtered = items.filter((i) => filter === 'All' || i.type === filter)

  return (
    <div className="screen">
      <TopBar showLogo />
      <div className="heading-block">
        <h1>Explore</h1>
        <p>Discover properties, experiences, investments, services</p>
      </div>
      <div className="section">
        <div className="input-shell clickable">
          <span className="input-icon">🔍</span>
          <input placeholder="Search for anything" readOnly />
        </div>
        <div className="chip-row">
          {['All', 'Properties', 'Experiences', 'Investments', 'Services', 'Promotions'].map((c) => (
            <div
              key={c}
              className={`chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="masonry">
        {filtered.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className="card clickable"
            onClick={() => {
              const detail =
                item.type === 'Properties'
                  ? ('property' as const)
                  : item.type === 'Experiences'
                    ? ('experience' as const)
                    : item.type === 'Investments'
                      ? ('investment' as const)
                      : ('service' as const)
              onSelectDetail({
                type: detail,
                title: item.title,
                img: item.img,
                price: item.meta,
                date: item.date,
              })
              onNavigate(
                detail === 'property'
                  ? 'property-detail'
                  : detail === 'experience'
                    ? 'experience-detail'
                    : detail === 'investment'
                      ? 'investment-detail'
                      : 'service-detail',
              )
            }}
          >
            <div
              className="img"
              style={{
                height: item.h,
                backgroundImage: `url('${item.img}')`,
              }}
            />
            <div className="body">
              <div className="tag">{item.type}</div>
              <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>{item.title}</div>
              <div style={{ color: '#6f6f6f', fontSize: 13 }}>{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const PromotionsTab = () => (
  <div className="screen">
    <TopBar showLogo />
    <div className="heading-block">
      <h1>Promotions & Offers</h1>
      <p>Top deals across properties, lifestyle, and services</p>
    </div>
    <div className="card">
      <div
        className="img"
        style={{ backgroundImage: `url('${getPropertyImage(3)}')` }}
      />
      <div className="body">
        <div className="tag">Featured</div>
        <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>Gold Promotion Bundle</div>
        <div style={{ color: '#6f6f6f', fontSize: 13 }}>10% off for 1 month listing boosts</div>
      </div>
    </div>
    <div className="section">
      <div className="label">Ending Soon</div>
      <div className="list-line">Waterfront Villa — 15% off • 2 days left</div>
      <div className="list-line">Short-let in VI — 12% off • 1 day left</div>
      <div className="list-line">Gym Membership — 20% off • 4 days left</div>
    </div>
    <div className="section">
      <div className="label">Recommended for you</div>
      <div className="list-line">Platinum Placement — ₦25k/week</div>
      <div className="list-line">Silver Promotion — ₦5k/week</div>
    </div>
  </div>
)

const TransactionDashboard = () => (
  <div className="screen">
    <TopBar showLogo />
    <div className="heading-block">
      <h1>Transactions</h1>
      <p>Wallet activity and spending analysis</p>
    </div>
    <div className="section">
      <div className="label">This Month</div>
      <div className="chip-row">
        <div className="chip active">Income: ₦450,000</div>
        <div className="chip">Expenses: ₦280,000</div>
        <div className="chip">Pending: ₦40,000</div>
      </div>
      <div className="chip-row" style={{ marginTop: 8 }}>
        {['7d', '30d', '90d'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 1 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="line-chart" style={{ marginTop: 12, padding: '0 10px' }}>
        <div className="chart-bars" style={{ height: '100%', alignItems: 'flex-end' }}>
          {[40, 90, 50, 80].map((h, idx) => (
            <div key={idx} className="bar">
              <div className="bar-fill" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="meta-row">
        <span>Daily activity</span>
        <span className="pill-timer">Feb 2025</span>
      </div>
    </div>
    <div className="section">
      <div className="label">Recent</div>
      {['Rent Escrow', 'Wallet Top-up', 'Service Booking', 'Investment Payout'].map((item, idx) => (
        <div key={item} className="list-line">
          {item} — <strong>{idx % 2 === 0 ? '-₦120k' : '+₦150k'}</strong> • {idx % 2 === 0 ? 'Pending' : 'Completed'}
        </div>
      ))}
    </div>
  </div>
)

type Opportunity = {
  title: string
  type: 'Fractional Ownership' | 'Development Projects' | 'Property Flipping' | 'REITs'
  min: string
  roi: string
  progress: number
  time: string
  img: string
}

const opportunities: Opportunity[] = [
  {
    title: 'Lekki Waterfront Residences',
    type: 'Fractional Ownership',
    min: '₦100,000',
    roi: '14% expected',
    progress: 72,
    time: '18 days left',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Victoria Island Offices',
    type: 'Development Projects',
    min: '₦750,000',
    roi: '18% expected',
    progress: 45,
    time: '30 days left',
    img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=60',
  },
  {
    title: 'Ikoyi Flip Duo',
    type: 'Property Flipping',
    min: '₦500,000',
    roi: '22% projected',
    progress: 60,
    time: '12 days left',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=60',
  },
]

const InvestmentExperience = ({ onCreate }: { onCreate: () => void }) => {
  const [filter, setFilter] = useState<string>('All')
  const [range, setRange] = useState<string>('1y')

  const filtered = opportunities.filter((o) => filter === 'All' || o.type === filter)

  return (
    <div className="screen">
      <TopBar showLogo />
      <div className="heading-block">
        <h1>Investment Opportunities</h1>
        <p>Explore verified projects and track your portfolio</p>
      </div>

      <div className="section" style={{ background: '#fff7fb' }}>
        <div className="label">
          New to investing? <span className="info-row clickable">{icons.info}<span>How it works</span></span>
        </div>
        <div className="list-line">Learn how fractional real estate works and how we secure your funds.</div>
        <div className="link">Read the guide</div>
      </div>

      <div className="section">
        <div className="label">Investment Categories</div>
        <div className="chip-row">
          {['All', 'Fractional Ownership', 'Development Projects', 'Property Flipping', 'REITs'].map((c) => (
            <div
              key={c}
              className={`chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {icons.info} {c}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="label">Opportunities</div>
        {filtered.map((op) => (
          <div key={op.title} className="card" style={{ display: 'flex', gap: 12, padding: 10 }}>
            <div
              style={{
                width: 110,
                minWidth: 110,
                height: 90,
                borderRadius: 10,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url('${op.img}')`,
              }}
            />
            <div className="body" style={{ padding: 0, flex: 1 }}>
              <div className="tag">{op.type}</div>
              <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>{op.title}</div>
              <div style={{ color: '#6f6f6f', fontSize: 13 }}>
                Min {op.min} • {op.roi}
              </div>
            <div className="progress-bar" style={{ marginTop: 8 }}>
              <div className="progress-fill" style={{ width: `${op.progress}%` }} />
            </div>
            <div className="meta-row" style={{ marginTop: 4 }}>
              <span>{op.progress}% funded</span>
              <span className="pill-timer">{op.time}</span>
            </div>
          </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="label">My Portfolio</div>
        <div className="chip-row">
          <div className="chip active">Value: ₦5.2M</div>
          <div className="chip">ROI: 12.4%</div>
          <div className="chip">Dividends: ₦180k</div>
        </div>
        <div className="chip-row" style={{ marginTop: 8 }}>
          {['1m', '3m', '1y', 'All'].map((c) => (
            <div
              key={c}
              className={`chip ${range === c ? 'active' : ''}`}
              onClick={() => setRange(c)}
            >
              {c}
            </div>
          ))}
        </div>
        <div className="line-chart" style={{ marginTop: 12, padding: '0 10px' }}>
          <LineChart points={[30, 60, 80, 50, 90, 110]} />
        </div>
        <div className="meta-row">
          <span>Performance</span>
          <span className="pill-timer">{range.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 10 }}>
          <div className="pie" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: '#5a5a5a' }}>
            <div><span style={{ color: '#d44260' }}>■</span> Fractional (45%)</div>
            <div><span style={{ color: '#f6c344' }}>■</span> Development (25%)</div>
            <div><span style={{ color: '#9dc5ff' }}>■</span> Rental Income (30%)</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="label">Filters</div>
        <div className="chip-row">
          {['Investment type', 'Min amount', 'Location', 'Expected returns', 'Risk level'].map((c) => (
            <div key={c} className="chip clickable">
              {icons.info} {c}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="label">Resources</div>
        <div className="list-line">Investment education center</div>
        <div className="list-line">Risk Assessment tool</div>
        <div className="list-line">Eligibility requirements</div>
      </div>
      <div className="footer-cta">
        <PrimaryButton label="Create Investment" filled onClick={onCreate} />
      </div>
    </div>
  )
}

const CreateInvestment = () => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="heading-block">
      <h1>Create Investment</h1>
      <p>Set up a new opportunity for investors</p>
    </div>

    <div className="section">
      <div className="label">Basic Info</div>
      <InputField placeholder="Opportunity Title" value="Lekki Waterfront Residences" active />
      <div className="label">Investment Type <span className="info-row clickable">{icons.info} <span>Learn about types</span></span></div>
      <div className="chip-row">
        {['Fractional Ownership', 'Development Projects', 'Property Flipping', 'REITs'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Minimum Investment</div>
      <InputField placeholder="₦100,000" value="₦100,000" active />
      <div className="label">Expected ROI</div>
      <InputField placeholder="e.g. 14% expected" value="14% expected" active />
      <div className="label">Funding Goal</div>
      <InputField placeholder="Total raise amount" value="₦50,000,000" active />
      <div className="label">Time Remaining</div>
      <InputField placeholder="e.g. 30 days" value="30 days" active />
    </div>

    <div className="section">
      <div className="label">Media</div>
      <div className="upload-tile">Upload property images</div>
      <div className="upload-tile">Upload investment deck / docs</div>
    </div>

    <div className="section">
      <div className="label">Details</div>
      <InputField placeholder="Location" value="Lekki, Lagos" active />
      <div className="label">Risk Level</div>
      <div className="chip-row">
        {['Low', 'Medium', 'High'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 1 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Timeline</div>
      <div className="list-line">Construction: Q2 2025 • Payouts: Quarterly</div>
      <div className="label">Eligibility</div>
      <div className="list-line">KYC required • BVN verified • Accredited investors for high-risk</div>
    </div>

    <div className="section">
      <div className="label">Projected Earnings</div>
      <div className="line-chart" style={{ marginTop: 8, padding: '0 10px' }}>
        <LineChart points={[0, 20, 40, 80, 120, 160]} />
      </div>
      <div className="meta-row" style={{ marginTop: 6 }}>
        <span>Projection assumes reinvested dividends and target ROI.</span>
      </div>
    </div>

    <div className="section">
      <div className="label">Risk & Resources</div>
      <div className="list-line">Risk Assessment tool</div>
      <div className="list-line">ROI calculation assumptions</div>
      <div className="list-line">Compliance & verification checklist</div>
    </div>

    <div className="footer-cta">
      <div className="dual-cta">
        <PrimaryButton label="Save Draft" filled />
        <PrimaryButton label="Publish" filled />
      </div>
    </div>
  </div>
)

const InboxTab = () => (
  <div className="screen">
    <TopBar showLogo />
    <div className="heading-block">
      <h1>Inbox</h1>
      <p>All conversations across properties, bookings, and services</p>
    </div>
    <div className="section">
      <div className="label">Filters</div>
      <div className="chip-row">
        {['All', 'Properties', 'Bookings', 'Investments', 'Services'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="section">
      <div className="label">Recent Messages</div>
      {[
        { name: 'Sarah (Agent)', note: 'New viewing time?', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=60' },
        { name: 'Ikoyi Garden Suites', note: 'Latest update', avatar: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=120&q=60' },
        { name: 'Uche Maintenance', note: 'Job accepted', avatar: 'https://images.unsplash.com/photo-1502764613149-7f1d229e2300?auto=format&fit=crop&w=120&q=60' },
        { name: 'Investment Desk', note: 'Funding progress', avatar: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=120&q=60' },
      ].map((c) => (
        <div key={c.name} className="list-line" style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: 'none' }}>
          <img
            src={c.avatar}
            alt={c.name}
            style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, color: '#111' }}>{c.name}</div>
            <div style={{ color: '#6f6f6f', fontSize: 12 }}>{c.note}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const WalletTab = () => (
  <div className="screen">
    <TopBar showLogo />
    <div className="heading-block">
      <h1>Dwell Wallet</h1>
      <p>Manage balance and transactions</p>
    </div>
    <div className="section">
      <div className="label">Balance</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#111' }}>₦250,000</div>
      <div className="chip-row">
        {['Add Money', 'Withdraw', 'Send', 'Request'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="section">
      <div className="label">Spending Trend</div>
      <div className="sparkline">
        {[10, 24, 12, 30, 18, 26].map((h, idx) => (
          <div key={idx} className="spark-bar" style={{ height: `${h}px` }} />
        ))}
      </div>
      <div className="meta-row">
        <span>Quiet hours 10pm - 7am</span>
      </div>
    </div>
    <div className="section">
      <div className="label">Transactions</div>
      {[
        { desc: 'Rent Escrow Payment', amt: '-₦120,000', status: 'Pending' },
        { desc: 'Wallet Top-up', amt: '+₦150,000', status: 'Completed' },
        { desc: 'Service Booking', amt: '-₦30,000', status: 'Completed' },
      ].map((t) => (
        <div key={t.desc} className="list-line">
          {t.desc} — <strong>{t.amt}</strong> • {t.status}
        </div>
      ))}
    </div>
  </div>
)

const ProfileTab = () => (
  <div className="screen">
    <TopBar showLogo />
    <div className="heading-block">
      <h1>Profile</h1>
      <p>Manage info, security, and preferences</p>
    </div>
    <div className="section">
      <div className="label">Completion</div>
      <div className="progress-bar" style={{ margin: '6px 0' }}>
        <div className="progress-fill" style={{ width: '70%' }} />
      </div>
      <div className="chip-row">
        {['Add profile photo', 'Complete verification', 'Add payment method'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
    </div>
    <div className="section">
      <div className="label">Settings</div>
      <div className="list-line">Notification Preferences</div>
      <div className="list-line">Security & 2FA</div>
      <div className="list-line">Payments & Wallet</div>
      <div className="list-line">Privacy & Data</div>
    </div>
  </div>
)

const PropertyDetail = ({ item }: { item: DetailItem | null }) => {
  const title = item?.type === 'property' ? item.title : 'Property'
  const gallery =
    item?.type === 'property'
      ? [item.img, getPropertyImage(1), getPropertyImage(2)].filter(Boolean)
      : [getPropertyImage(0), getPropertyImage(1), getPropertyImage(2)]
  const price = item?.price ?? '₦500,000 / month'
  const [slide, setSlide] = useState(0)
  const nextSlide = () => setSlide((s) => (s + 1) % gallery.length)
  const prevSlide = () => setSlide((s) => (s - 1 + gallery.length) % gallery.length)
  return (
    <div className="screen">
      <TopBar showBack showLogo />
      <div className="card" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 12px 26px rgba(0,0,0,0.08)' }}>
        <div
          className="img"
          style={{ height: 260, backgroundImage: `url('${gallery[slide]}')`, position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: 14,
              fontSize: 12,
            }}
          >
            {slide + 1} / {gallery.length}
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 8 }}>
            <button className="primary-btn filled" style={{ width: 'auto', height: 34, padding: '0 12px' }} onClick={prevSlide}>
              Prev
            </button>
            <button className="primary-btn filled" style={{ width: 'auto', height: 34, padding: '0 12px' }} onClick={nextSlide}>
              Next
            </button>
          </div>
        </div>
        <div className="body" style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ fontWeight: 800, color: '#111', fontSize: 16 }}>{title}</div>
                <span style={{ fontSize: 14, color: '#2b74ff' }}>✔️</span>
              </div>
              <div style={{ color: '#6f6f6f', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                Ikoyi, Lagos <span style={{ color: '#2b74ff', fontWeight: 600 }}>Verified</span>
              </div>
            </div>
            <div style={{ color: '#6f6f6f', fontSize: 12 }}>⭐️ 4.8 (50)</div>
          </div>
          <div style={{ marginTop: 8, fontWeight: 800, color: '#111' }}>{price}</div>
          <div className="chip-row" style={{ marginTop: 8 }}>
            {['3 Bed', '3 Bath', '220 sqm', 'Furnished', 'Air Conditioning', 'Pet Friendly'].map((c) => (
              <div key={c} className="chip">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section">
        <div className="label">Description</div>
        <div className="list-line">
          Premium serviced apartment with 24/7 power, pool, gym, and dedicated concierge.
        </div>
        <div className="label">Amenities</div>
        <div className="chip-row">
          {['Pool', 'Gym', '24/7 Power', 'Security', 'Parking', 'Furnished'].map((c) => (
            <div key={c} className="chip">
              {c}
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <div className="label">Agent</div>
        <div className="list-line">Sarah Johnson — Verified Agent — 98% response rate</div>
        <div className="review">⭐️⭐️⭐️⭐️☆ (4.6) • 112 reviews</div>
      </div>
      <div className="section">
        <div className="label">Reviews</div>
        <div className="review-list">
          {['Great host, smooth move-in.', 'Power was steady, location is safe.', 'Responsive agent, clean space.'].map(
            (text) => (
              <div key={text} className="review-card">
                <div style={{ fontWeight: 700, color: '#111' }}>⭐️⭐️⭐️⭐️☆</div>
                <div style={{ color: '#5a5a5a', fontSize: 13 }}>{text}</div>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="section">
        <div className="label">Location</div>
        <div className="map">
          <div>Map preview • Lekki</div>
        </div>
      </div>
      <div className="section">
        <div className="label">Similar Properties</div>
        <div className="carousel">
          {['Victoria Island Loft', 'Banana Island Duplex', 'Lekki Phase 1 Studio'].map((title, idx) => (
            <div key={title} className="card" style={{ marginBottom: 0 }}>
              <div className="img" style={{ backgroundImage: `url('${getPropertyImage(idx + 1)}')` }} />
              <div className="body">
                <div className="tag">{idx === 1 ? 'For Sale' : 'For Rent'}</div>
                <div style={{ fontWeight: 700, color: '#111', marginTop: 6 }}>{title}</div>
                <div style={{ color: '#6f6f6f', fontSize: 13 }}>
                  {idx === 1 ? '₦120M' : '₦420k / month'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-cta">
        <PrimaryButton label="Contact Agent" filled />
        <PrimaryButton label="Make Offer" filled />
        <PrimaryButton label="Schedule Viewing" filled />
      </div>
    </div>
  )
}

const BookingFlow = () => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="heading-block">
      <h1>Book Ikoyi Garden Suites</h1>
      <p>Confirm dates, guests, and fees</p>
    </div>
    <div className="section">
      <div className="label">Dates</div>
      <div className="list-line">Move-in: 12 Feb 2025</div>
      <div className="list-line">Lease term: 12 months</div>
    </div>
    <div className="section">
      <div className="label">Summary</div>
      <div className="list-line">Base rent — ₦520,000</div>
      <div className="list-line">Service fee — ₦15,000</div>
      <div className="list-line">Security deposit — ₦520,000</div>
      <div className="list-line">
        <strong>Total — ₦1,055,000</strong>
      </div>
    </div>
    <div className="section">
      <div className="label">Payment Method</div>
      <div className="chip-row">
        {['Wallet', 'Saved Card', 'Add new'].map((c, idx) => (
          <div key={c} className={`chip ${idx === 0 ? 'active' : ''}`}>
            {c}
          </div>
        ))}
      </div>
      <div className="label">Terms</div>
      <div className="list-line">I accept cancellation policy and escrow release terms.</div>
    </div>
    <div className="footer-cta">
      <PrimaryButton label="Contact Agent" filled />
      <PrimaryButton label="View Terms" filled />
      <PrimaryButton label="Submit Booking" filled />
    </div>
  </div>
)

const BookingShortlet = () => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="heading-block">
      <h1>Book VI Waterfront Loft</h1>
      <p>Confirm stay dates and guests</p>
    </div>
    <div className="section">
      <div className="label">Stay</div>
      <div className="list-line">Check-in: 12 Feb 2025</div>
      <div className="list-line">Check-out: 15 Feb 2025</div>
      <div className="list-line">Guests: 2</div>
    </div>
    <div className="section">
      <div className="label">Pricing</div>
      <div className="list-line">₦120,000 x 3 nights — ₦360,000</div>
      <div className="list-line">Service fee — ₦18,000</div>
      <div className="list-line">Security deposit — ₦150,000</div>
      <div className="list-line">
        <strong>Total — ₦528,000</strong>
      </div>
    </div>
    <div className="section">
      <div className="label">Cancellation</div>
      <div className="list-line">Moderate policy: Full refund up to 5 days before check-in.</div>
    </div>
    <div className="footer-cta">
      <PrimaryButton label="Contact Host" filled />
      <PrimaryButton label="Add Payment" filled />
      <PrimaryButton label="Book Now" filled />
    </div>
  </div>
)

const ScreenBar = ({ current, onChange }: { current: Screen; onChange: (s: Screen) => void }) => {
  const [collapsed, setCollapsed] = useState(false)

  const label = (s: Screen) =>
    s
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace('Otp', 'OTP')

  return (
    <div className={`screen-bar ${collapsed ? 'collapsed' : ''}`}>
      <div className="screen-toggle">
        <strong>Screen Switcher</strong>
        <button onClick={() => setCollapsed((c) => !c)}>{collapsed ? 'Expand' : 'Collapse'}</button>
      </div>
      {!collapsed &&
        screenFlows.map((flow) => (
          <div key={flow.title}>
            <h4>{flow.title}</h4>
            <div className="screen-scroll">
              {flow.screens.map((opt) => (
                <div
                  key={opt}
                  className={`selector-chip ${current === opt ? 'active' : ''}`}
                  onClick={() => onChange(opt)}
                >
                  {label(opt)}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

const NavArrows = ({ current, onChange }: { current: Screen; onChange: (s: Screen) => void }) => {
  const idx = screenOrder.indexOf(current)
  const prev = screenOrder[(idx - 1 + screenOrder.length) % screenOrder.length]
  const next = screenOrder[(idx + 1) % screenOrder.length]
  return (
    <div className="arrow-nav">
      <div className="arrow-btn" onClick={() => onChange(prev)}>{icons.back}</div>
      <div
        className="arrow-btn"
        onClick={() => onChange(next)}
        style={{ transform: 'rotate(180deg)' }}
      >
        {icons.back}
      </div>
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [emailTimer, setEmailTimer] = useState(45)
  const [otpTimer, setOtpTimer] = useState(55)
  const [detailItem, setDetailItem] = useState<DetailItem | null>(null)

  useEffect(() => {
    let timerId: number | undefined
    if (screen === 'email-verification' || screen === 'email-resend') {
      setEmailTimer(screen === 'email-resend' ? 0 : 45)
      timerId = window.setInterval(() => {
        setEmailTimer((t) => (t > 0 ? t - 1 : 0))
      }, 1000)
    } else {
      setEmailTimer(45)
    }
    return () => {
      if (timerId) window.clearInterval(timerId)
    }
  }, [screen])

  useEffect(() => {
    let timerId: number | undefined
    if (screen === 'otp' || screen === 'otp-resend' || screen === 'login-otp') {
      setOtpTimer(screen === 'otp-resend' ? 0 : 55)
      timerId = window.setInterval(() => {
        setOtpTimer((t) => (t > 0 ? t - 1 : 0))
      }, 1000)
    } else {
      setOtpTimer(55)
    }
    return () => {
      if (timerId) window.clearInterval(timerId)
    }
  }, [screen])

  const onboardingScreens = new Set<Screen>([
    'splash',
    'signup-empty',
    'signup-email',
    'signup-weak',
    'signup-error',
    'signup-filled',
    'login',
    'email-verification',
    'email-resend',
    'otp',
    'otp-resend',
    'login-otp',
    'user-type',
    'b2b-selection',
    'account-success',
  ])

  const isOnboarding = onboardingScreens.has(screen) || screen.includes('step') || screen.startsWith('verify')

  const navActive: NavKey =
    screen === 'inbox'
      ? 'inbox'
      : screen === 'search'
        ? 'search'
        : screen === 'wallet' || screen === 'transactions' || screen === 'invest-dashboard'
          ? 'wallet'
          : screen === 'profile'
            ? 'profile'
            : 'home'
  const showNav = !isOnboarding

  return (
    <>
      <div className="app-shell">
        <div className="phone-frame">
          {screen !== 'splash' && <StatusBar />}
          <div style={{ paddingBottom: showNav ? 140 : 0, minHeight: '100%' }}>
            {screen === 'splash' ? (
              <SplashScreen onContinue={() => setScreen('signup-empty')} />
            ) : screen === 'email-verification' ? (
              <EmailVerification timeLeft={emailTimer} />
            ) : screen === 'email-resend' ? (
              <EmailVerification timeLeft={emailTimer} canResend />
            ) : screen === 'otp' ? (
              <OtpVerification timeLeft={otpTimer} />
            ) : screen === 'otp-resend' ? (
              <OtpVerification timeLeft={otpTimer} canResend />
            ) : screen === 'user-type' ? (
              <UserTypeSelection />
            ) : screen === 'b2b-selection' ? (
              <B2BSelection />
            ) : screen === 'account-success' ? (
              <AccountSuccess />
            ) : screen === 'login-otp' ? (
              <LoginOtp timeLeft={otpTimer} />
            ) : screen === 'verify-method' ? (
              <VerifyMethod />
            ) : screen === 'verify-processing' ? (
              <VerifyProcessing />
            ) : screen === 'verify-success' ? (
              <VerifySuccess />
            ) : screen === 'agent-step1' ? (
              <AgentStep1 />
            ) : screen === 'agent-step2' ? (
              <AgentStep2 />
            ) : screen === 'agent-step3' ? (
              <AgentStep3 />
            ) : screen === 'owner-step1' ? (
              <OwnerStep1 />
            ) : screen === 'owner-step2' ? (
              <OwnerStep2 />
            ) : screen === 'owner-step3' ? (
              <OwnerStep3 />
            ) : screen === 'developer-step1' ? (
              <DeveloperStep1 />
            ) : screen === 'developer-step2' ? (
              <DeveloperStep2 />
            ) : screen === 'developer-step3' ? (
              <DeveloperStep3 />
            ) : screen === 'developer-step4' ? (
              <DeveloperStep4 />
            ) : screen === 'service-step1' ? (
              <ServiceStep1 />
            ) : screen === 'service-step2' ? (
              <ServiceStep2 />
            ) : screen === 'service-step3' ? (
              <ServiceStep3 />
            ) : screen === 'lifestyle-step1' ? (
              <LifestyleStep1 />
            ) : screen === 'lifestyle-step2' ? (
              <LifestyleStep2 />
            ) : screen === 'lifestyle-step3' ? (
              <LifestyleStep3 />
            ) : screen === 'invest-step1' ? (
              <InvestStep1 />
            ) : screen === 'invest-step2' ? (
              <InvestStep2 />
            ) : screen === 'invest-step3' ? (
              <InvestStep3 />
            ) : screen === 'transactions' ? (
              <TransactionDashboard />
            ) : screen === 'invest-dashboard' ? (
              <InvestmentExperience onCreate={() => setScreen('create-investment')} />
            ) : screen === 'home' ? (
              <HomeTab onSelectDetail={setDetailItem} onNavigate={setScreen} />
            ) : screen === 'inbox' ? (
              <InboxTab />
            ) : screen === 'search' ? (
              <ExploreTab onSelectDetail={setDetailItem} onNavigate={setScreen} />
            ) : screen === 'wallet' ? (
              <WalletTab />
            ) : screen === 'profile' ? (
              <ProfileTab />
            ) : screen === 'promotions' ? (
              <PromotionsTab />
            ) : screen === 'create-investment' ? (
              <CreateInvestment />
            ) : screen === 'property-detail' ? (
              <PropertyDetail item={detailItem} />
            ) : screen === 'experience-detail' && detailItem && detailItem.type === 'experience' ? (
              <ExperienceDetail item={detailItem} />
            ) : screen === 'investment-detail' && detailItem && detailItem.type === 'investment' ? (
              <InvestmentDetail item={detailItem} />
            ) : screen === 'service-detail' && detailItem && detailItem.type === 'service' ? (
              <ServiceDetail item={detailItem} />
            ) : screen === 'booking-flow' ? (
              <BookingFlow />
            ) : screen === 'booking-shortlet' ? (
              <BookingShortlet />
            ) : (
              <OnboardingScreen mode={screen} />
            )}
          </div>
          {showNav && (
            <BottomNav
              active={navActive}
              onSelect={(key) =>
                setScreen(
                  key === 'home'
                    ? 'home'
                    : key === 'inbox'
                      ? 'inbox'
                      : key === 'search'
                        ? 'search'
                        : key === 'wallet'
                          ? 'wallet'
                          : 'profile',
                )
              }
            />
          )}
        </div>
      </div>
      <NavArrows current={screen} onChange={setScreen} />
      <ScreenBar current={screen} onChange={setScreen} />
    </>
  )
}

export default App
const LineChart = ({ points }: { points: number[] }) => {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const norm = (v: number, i: number) => {
    const x = (i / (points.length - 1)) * 100
    const y = ((v - min) / (max - min || 1)) * 100
    return `${x},${100 - y}`
  }
  const path = points.map((p, i) => norm(p, i)).join(' ')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
      <polyline fill="none" stroke={accent} strokeWidth="2" points={path} />
      {points.map((p, i) => (
        <circle key={i} cx={norm(p, i).split(',')[0]} cy={norm(p, i).split(',')[1]} r="1.5" fill={accent} />
      ))}
    </svg>
  )
}
const ExperienceDetail = ({ item }: { item: DetailItem & { type: 'experience' } }) => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="card">
      <div className="img" style={{ height: 210, backgroundImage: `url('${item.img}')` }} />
      <div className="body">
        <div className="tag">Experience</div>
        <div style={{ fontWeight: 800, color: '#111', marginTop: 6 }}>{item.title}</div>
        <div style={{ color: '#6f6f6f', fontSize: 13 }}>Victoria Island</div>
        <div style={{ marginTop: 6, fontWeight: 700, color: '#111' }}>{item.price}</div>
        {item.date ? (
          <div style={{ marginTop: 6, fontWeight: 600, color: '#111' }}>📅 {item.date}</div>
        ) : null}
        <div className="chip-row" style={{ marginTop: 8 }}>
          {['Food', 'Music', 'Outdoor', 'Verified Host'].map((c) => (
            <div key={c} className="chip">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="section">
      <div className="label">Overview</div>
      <div className="list-line">Curated dining + live music with waterfront vibes.</div>
    </div>
    <div className="section">
      <div className="label">Host</div>
      <div className="list-line">Brunch Club — 4.8 (120 reviews)</div>
    </div>
    <div className="footer-cta">
      <PrimaryButton label="Book Experience" filled />
      <PrimaryButton label="Contact Host" filled />
    </div>
  </div>
)

const InvestmentDetail = ({ item }: { item: DetailItem }) => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="card">
      <div className="img" style={{ height: 210, backgroundImage: `url('${item.img}')` }} />
      <div className="body">
        <div className="tag">Investment</div>
        <div style={{ fontWeight: 800, color: '#111', marginTop: 6 }}>{item.title}</div>
        <div style={{ color: '#6f6f6f', fontSize: 13 }}>Lekki • Development</div>
        <div style={{ marginTop: 6, fontWeight: 700, color: '#111' }}>{item.price}</div>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="progress-fill" style={{ width: '72%' }} />
        </div>
        <div className="meta-row" style={{ marginTop: 4 }}>
          <span>72% funded</span>
          <span className="pill-timer">18 days left</span>
        </div>
      </div>
    </div>
    <div className="section">
      <div className="label">Details</div>
      <div className="list-line">Min ₦100k • Expected ROI 14% • Quarterly payouts</div>
    </div>
    <div className="footer-cta">
      <PrimaryButton label="Invest Now" filled />
      <PrimaryButton label="View Deck" filled />
    </div>
  </div>
)

const ServiceDetail = ({ item }: { item: DetailItem }) => (
  <div className="screen">
    <TopBar showBack showLogo />
    <div className="card">
      <div className="img" style={{ height: 210, backgroundImage: `url('${item.img}')` }} />
      <div className="body">
        <div className="tag">Service</div>
        <div style={{ fontWeight: 800, color: '#111', marginTop: 6 }}>{item.title}</div>
        <div style={{ color: '#6f6f6f', fontSize: 13 }}>Lagos • Maintenance</div>
        <div style={{ marginTop: 6, fontWeight: 700, color: '#111' }}>{item.price}</div>
        <div className="chip-row" style={{ marginTop: 8 }}>
          {['Electrical', 'Plumbing', 'Verified', 'Fast Response'].map((c) => (
            <div key={c} className="chip">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="section">
      <div className="label">About</div>
      <div className="list-line">Trusted maintenance provider with 4.9 rating.</div>
    </div>
    <div className="footer-cta">
      <PrimaryButton label="Book Service" filled />
      <PrimaryButton label="Contact Provider" filled />
    </div>
  </div>
)
