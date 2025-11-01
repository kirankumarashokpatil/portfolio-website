import { useEffect, useRef, useState } from 'react';

const TerminalHero = ({ 
  commands = [
    'whoami',
    'Kirankumar Ashok Patil - Lead AI Engineer',
    '',
    'cat skills.txt',
    'BESS Optimization | Energy Trading | Agentic Systems',
    'PyTorch | Gurobi | MLOps | LLMs',
    '',
    'python optimize.py --portfolio=4GW',
    'Optimization complete: +12% profit, -15% degradation',
    '✅ Ready for deployment'
  ],
  typingSpeed = 50,
  pauseDuration = 1000
}) => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef(null);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (!isTyping || currentCommand >= commands.length) return;

    const currentText = commands[currentCommand];
    
    if (currentChar < currentText.length) {
      const timer = setTimeout(() => {
        setCurrentChar(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      // Finished typing current command, pause then move to next
      const timer = setTimeout(() => {
        setCurrentCommand(prev => prev + 1);
        setCurrentChar(0);
      }, pauseDuration);
      
      return () => clearTimeout(timer);
    }
  }, [currentCommand, currentChar, commands, typingSpeed, pauseDuration, isTyping]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [currentCommand, currentChar]);

  const getPrompt = (isCommand) => {
    return isCommand ? (
      <span className="text-green-400">kiran@portfolio</span>
    ) : null;
  };

  const isCommandLine = (text) => {
    return ['whoami', 'cat skills.txt', 'python optimize.py --portfolio=4GW'].includes(text);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="text-gray-100 leading-relaxed h-64 overflow-y-auto"
      >
        {commands.slice(0, currentCommand).map((command, index) => (
          <div key={index} className="mb-1">
            {isCommandLine(command) && (
              <>
                {getPrompt(true)}
                <span className="text-blue-400 ml-1">:~$</span>
                <span className="ml-2 text-white">{command}</span>
              </>
            )}
            {!isCommandLine(command) && command !== '' && (
              <div className="text-cyan-300 pl-4">{command}</div>
            )}
            {command === '' && <div className="h-4"></div>}
          </div>
        ))}
        
        {currentCommand < commands.length && (
          <div className="mb-1">
            {isCommandLine(commands[currentCommand]) && (
              <>
                {getPrompt(true)}
                <span className="text-blue-400 ml-1">:~$</span>
                <span className="ml-2 text-white">
                  {commands[currentCommand].slice(0, currentChar)}
                  <span 
                    className={`inline-block w-2 h-5 ml-1 bg-gray-100 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    } transition-opacity`}
                  >
                    _
                  </span>
                </span>
              </>
            )}
            {!isCommandLine(commands[currentCommand]) && commands[currentCommand] !== '' && (
              <div className="text-cyan-300 pl-4">
                {commands[currentCommand].slice(0, currentChar)}
                <span 
                  className={`inline-block w-2 h-5 ml-1 bg-cyan-300 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity`}
                >
                  _
                </span>
              </div>
            )}
          </div>
        )}
        
        {currentCommand >= commands.length && (
          <div className="mt-4">
            {getPrompt(true)}
            <span className="text-blue-400 ml-1">:~$</span>
            <span 
              className={`inline-block w-2 h-5 ml-2 bg-gray-100 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } transition-opacity`}
            >
              _
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalHero;