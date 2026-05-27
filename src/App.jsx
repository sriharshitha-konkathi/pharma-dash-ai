import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home'; 
import { DrugSearch } from './components/Drugsearch';
import { DoseCalc } from './components/DoseCalc';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';


function App() {
  
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />


     <main className="grow pt-24 pb-12 px-6 max-w-6xl mx-auto w-full">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        
        {activeTab === 'search' && <DrugSearch />}
        
        {activeTab === 'calculate' && <DoseCalc />}

        {activeTab === 'ai' && <AiAssistant />}
      </main>


      <Footer />
    </div>
  );
}

export default App;