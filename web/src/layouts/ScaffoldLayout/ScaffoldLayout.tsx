import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>
        </h1>
        <Link to={routes.home()}>{'<< Home'}</Link>
        {isAuthenticated ? (
          <div>
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
        <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
