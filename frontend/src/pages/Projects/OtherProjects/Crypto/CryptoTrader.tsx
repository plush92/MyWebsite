import React from 'react';
import PageLayout from '../../../../components/PageLayout';
import CryptoDashboard from '../../../../components/FinanceProjects/CryptoDashboard/CryptoDashboard';

//Project Props
type ProjectProps = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

const CryptoTrader: React.FC<ProjectProps> = ({ mode, toggleMode }) => {
  return (
    <PageLayout mode={mode} toggleMode={toggleMode}>
      <CryptoDashboard />
    </PageLayout>
  );
};

export default CryptoTrader;
