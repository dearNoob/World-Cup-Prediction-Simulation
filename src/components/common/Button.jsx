/**
 * Button — Reusable button component with multiple variants.
 *
 * @param {string}   variant   - "primary" | "danger" | "ghost" (default: "primary")
 * @param {string}   size      - "sm" | "md" | "lg" (default: "md")
 * @param {boolean}  disabled  - Disable the button
 * @param {Function} onClick   - Click handler
 * @param {string}   className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 */
const Button = ({ variant = 'primary', size = 'md', disabled = false, onClick, className = '', children, ...props }) => {
  const baseClasses = {
    primary: 'btn-primary',
    danger:  'btn-danger',
    ghost:   'btn-ghost',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses[variant] || baseClasses.primary}
        ${sizeClasses[size] || sizeClasses.md}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
