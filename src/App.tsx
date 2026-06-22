/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './views/Homepage';
import ListingsPage from './views/ListingsPage';
import PropertyDetailPage from './views/PropertyDetailPage';
import AdminPanel from './components/AdminPanel';
import { AgentsPage, AgentDetailPage, AboutPage, ContactPage } from './views/StaticPages';
import { Property, Agent } from './types';

export default function App() {
  const [currentView, setCurrentView] = React.useState<string>('home');
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = React.useState<string | null>(null);
  
  // Real database dynamic state hooks
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [isBootstrapping, setIsBootstrapping] = React.useState(true);

  // Transfer search selections from HomeHero directly to state parameters in listings tab
  const [initialSearchState, setInitialSearchState] = React.useState<{
    location: string;
    type: string;
    priceRange: string;
  } | undefined>(undefined);

  React.useEffect(() => {
    fetchCoreAssets();
  }, [currentView]); // Re-fetch whenever view switches to load latest Admin edits immediately!

  const fetchCoreAssets = async () => {
    try {
      const propRes = await fetch('/api/properties?limit=100'); // Fetch all for front client state arrays
      const propData = await propRes.json();
      setProperties(propData.properties || []);

      const agentRes = await fetch('/api/agents');
      const agentData = await agentRes.json();
      setAgents(agentData || []);
    } catch (err) {
      console.error('Error fetching dynamic assets:', err);
    } finally {
      setIsBootstrapping(false);
    }
  };

  const handleNavigate = (view: string, id?: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView(view);
    setInitialSearchState(undefined); // Clear old parameters on standard navs
    
    if (view === 'detail' && id) {
      setSelectedPropertyId(id);
    } else if (view === 'agent-detail' && id) {
      setSelectedAgentId(id);
    }
  };

  const handleSearchSubmit = (params: { location: string; type: string; priceRange: string }) => {
    setInitialSearchState(params);
    setCurrentView('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPropertyFromCard = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectAgentFromTeam = (id: string) => {
    setSelectedAgentId(id);
    setCurrentView('agent-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFCFC] selection:bg-[#C8A49A] selection:text-white font-sans text-[#1A1A1A]">
      
      {/* Dynamic Navbar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main View Router Container */}
      <main className="flex-1">
        {isBootstrapping ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C8A49A] animate-pulse">
              Initializing Lagos Arch Registry...
            </span>
            <div className="w-12 h-1 bg-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#C8A49A] w-1/2 animate-[shimmer_1s_infinite]" />
            </div>
          </div>
        ) : (
          <>
            {currentView === 'home' && (
              <Homepage 
                properties={properties} 
                onNavigate={handleNavigate} 
                onSearchSubmit={handleSearchSubmit} 
              />
            )}

            {currentView === 'listings' && (
              <ListingsPage 
                initialSearchState={initialSearchState} 
                onSelectProperty={selectPropertyFromCard} 
              />
            )}

            {currentView === 'detail' && selectedPropertyId && (
              <PropertyDetailPage 
                propertyId={selectedPropertyId} 
                properties={properties} 
                agents={agents} 
                onBack={() => handleNavigate('listings')} 
                onSelectProperty={selectPropertyFromCard}
              />
            )}

            {currentView === 'team' && (
              <AgentsPage 
                agents={agents} 
                properties={properties} 
                onSelectAgent={selectAgentFromTeam} 
                onNavigate={handleNavigate} 
              />
            )}

            {currentView === 'agent-detail' && selectedAgentId && (
              <AgentDetailPage 
                agentId={selectedAgentId} 
                agents={agents} 
                properties={properties} 
                onBack={() => handleNavigate('team')} 
                onSelectProperty={selectPropertyFromCard}
              />
            )}

            {currentView === 'about' && <AboutPage />}

            {currentView === 'contact' && <ContactPage />}

            {currentView === 'admin' && (
              <AdminPanel onBack={() => handleNavigate('home')} />
            )}
          </>
        )}
      </main>

      {/* Understated Architectural Footer - hidden inside Active Admin Panel views */}
      {currentView !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}

    </div>
  );
}
