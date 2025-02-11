import React from 'react';
import { AppSidebar } from '@/Components/app-sidebar';
import { SidebarInset, SidebarProvider, } from '@/Components/ui/sidebar';
import PropTypes from 'prop-types';
import Topbar from './Topbar';

const AuthenticatedLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

AuthenticatedLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default AuthenticatedLayout;


