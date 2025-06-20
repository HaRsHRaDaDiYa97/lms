// src/components/UserAvatar.js (or wherever you prefer to keep your components)
import React from 'react';

const UserAvatar = ({ user, size = 'md', className = '' }) => {
    if (!user) {
        return null; // Or render a default placeholder if no user is provided
    }


    // Determine initials
    const getInitials = (name, email) => {
        if (name) {
            const nameParts = name.split(' ');
            if (nameParts.length > 1) {
                return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
            }
            return nameParts[0][0].toUpperCase();
        }
        if (email) {
            return email[0].toUpperCase();
        }
        return '?'; // Fallback if no name or email
    };

    const initials = getInitials(user?.name, user?.email);

    // Determine size classes
    let sizeClasses = '';
    let textSizeClasses = '';

    switch (size) {
        case 'sm':
            sizeClasses = 'w-8 h-8';
            textSizeClasses = 'text-sm';
            break;
        case 'md': // Default
            sizeClasses = 'w-10 h-10';
            textSizeClasses = 'text-base';
            break;
        case 'lg':
            sizeClasses = 'w-12 h-12';
            textSizeClasses = 'text-lg';
            break;
        case 'xl':
            sizeClasses = 'w-16 h-16';
            textSizeClasses = 'text-xl';
            break;
        default:
            sizeClasses = 'w-10 h-10';
            textSizeClasses = 'text-base';
            break;
    }

    return (
        <div
            className={`relative flex items-center justify-center rounded-full overflow-hidden
                        bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200
                        font-medium flex-shrink-0 ${sizeClasses} ${className}`}
            aria-label={user?.name || user?.email || "User avatar"}
            title={user?.name || user?.email || "User"}
        >
            {user?.photoUrl ? (
                <img
                    src={user?.photoUrl}
                    alt={user?.name || user?.email || "User avatar"}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.style.display = 'none'; // Hide broken image
                        e.target.parentNode.querySelector('.initials-fallback').style.display = 'flex'; // Show initials fallback
                    }}
                />
            ) : null}
            <span className={`initials-fallback ${textSizeClasses} ${user?.photoUrl ? 'hidden' : 'flex'}`}>
                {initials}
            </span>
        </div>
    );
};

export default UserAvatar;