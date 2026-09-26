function PageHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <header className="page-header">

      <div>
        {eyebrow && (
          <span className="page-eyebrow">
            {eyebrow}
          </span>
        )}

        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {action && (
        <div className="header-actions">
          {action}
        </div>
      )}
    </header>
  )
}

export default PageHeader