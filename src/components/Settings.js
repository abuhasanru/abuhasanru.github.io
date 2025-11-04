import React, { useState } from 'react';
import HeadsManager from './HeadsManager';
import SubHeadsManager from './SubHeadsManager';
import DataManager from './DataManager';
import Themes from './Themes';
import Shaders from './Shaders';
import Tutorial from './Tutorial';
import FAQ from './FAQ';
import About from './About';

const Settings = ({ setTheme, setShader }) => {
  const [activeTab, setActiveTab] = useState('incomeHeads');

  const renderContent = () => {
    switch (activeTab) {
      case 'incomeHeads':
        return <HeadsManager type="Income" />;
      case 'expenseHeads':
        return <HeadsManager type="Expense" />;
      case 'incomeSubHeads':
        return <SubHeadsManager type="Income" />;
      case 'expenseSubHeads':
        return <SubHeadsManager type="Expense" />;
      case 'dataManagement':
        return <DataManager />;
      case 'themes':
        return <Themes setTheme={setTheme} />;
      case 'shaders':
        return <Shaders setShader={setShader} />;
      case 'tutorial':
        return <Tutorial />;
      case 'faq':
        return <FAQ />;
      case 'about':
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="settings-nav">
        <button onClick={() => setActiveTab('incomeHeads')}>Income Heads</button>
        <button onClick={() => setActiveTab('expenseHeads')}>Expense Heads</button>
        <button onClick={() => setActiveTab('incomeSubHeads')}>Income Sub-Heads</button>
        <button onClick={() => setActiveTab('expenseSubHeads')}>Expense Sub-Heads</button>
        <button onClick={() => setActiveTab('dataManagement')}>Data Management</button>
        <button onClick={() => setActiveTab('themes')}>Themes</button>
        <button onClick={() => setActiveTab('shaders')}>Shaders</button>
        <button onClick={() => setActiveTab('tutorial')}>Tutorial</button>
        <button onClick={() => setActiveTab('faq')}>FAQ</button>
        <button onClick={() => setActiveTab('about')}>About</button>
      </div>
      <div className="settings-content">{renderContent()}</div>
    </div>
  );
};

export default Settings;
