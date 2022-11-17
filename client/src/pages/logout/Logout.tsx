import React, { useEffect } from 'react';
import { useAuth } from '../../utils';

/**
 * This page is used to perform a logout action from a source not within the router, this can be an external webhook
 * or business logic outside of the app pages.
 * @returns The logout page
 */
export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return <div>Logging out now...</div>;
}
