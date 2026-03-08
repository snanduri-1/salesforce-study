import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Brain, CheckCircle, Circle, ChevronRight, ChevronLeft, X, Menu } from 'lucide-react';

const SalesforceStudyApp = () => {
  const [currentView, setCurrentView] = useState('modules');
  const [currentModule, setCurrentModule] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completedModules, setCompletedModules] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  const studyModules = [
    {
      id: 1,
      title: "Data & Analytics Management",
      weight: "17%",
      color: "bg-blue-500",
      description: "Reports, dashboards, data import/export, and validation rules",
      keyNotes: [
        "Report types: Tabular (no grouping), Summary (grouping + subtotals), Matrix (row + column grouping), Joined (multiple report types)",
        "Custom report types allow you to create reports with specific object relationships",
        "Dashboard running user determines data visibility - use dynamic dashboards for personalized views",
        "Cross filters: 'with' or 'without' related records",
        "Data Loader: For 50k+ records, deletes, upserts. Data Import Wizard: Under 50k, simple imports",
        "Duplicate rules prevent duplicates, matching rules identify them",
        "Validation rules fire before save, can reference multiple fields and objects"
      ],
      tips: "Build 10+ reports of each type in your practice org. Create dashboards with filters. Practice using Data Loader for CSV imports/exports.",
      flashcards: [
        { q: "When should you use Data Loader vs Data Import Wizard?", a: "Data Loader: 50k+ records, deletes, complex scenarios, scheduled exports. Data Import Wizard: Under 50k records, simple imports, GUI-friendly." },
        { q: "What's the difference between duplicate rules and matching rules?", a: "Matching rules identify potential duplicates using criteria. Duplicate rules prevent or allow duplicates when matching rules are triggered." },
        { q: "What are the four report formats?", a: "Tabular (list, no grouping), Summary (grouping + subtotals), Matrix (rows + columns grouping), Joined (combines multiple report types)" }
      ],
      quiz: [
        {
          question: "An administrator needs to create a report showing accounts and their related opportunities. Some accounts have no opportunities. Which report type should be used?",
          options: [
            "Accounts with Opportunities",
            "Opportunities with Accounts",
            "Accounts with or without Opportunities",
            "Custom report type with outer join"
          ],
          correct: 2,
          explanation: "To show accounts that may not have opportunities, you need 'with or without' in the report type name. This performs an outer join showing all accounts regardless of whether they have opportunities."
        },
        {
          question: "What is the maximum number of records that can be imported using the Data Import Wizard?",
          options: ["10,000", "50,000", "100,000", "No limit"],
          correct: 1,
          explanation: "Data Import Wizard supports up to 50,000 records. For larger volumes, use Data Loader."
        },
        {
          question: "Which report format allows grouping by both rows and columns?",
          options: ["Tabular", "Summary", "Matrix", "Joined"],
          correct: 2,
          explanation: "Matrix reports allow grouping by both rows and columns, creating a grid of summarized data."
        },
        {
          question: "What can you do with bucket fields in reports?",
          options: [
            "Store calculated values permanently",
            "Group values without creating a formula",
            "Create cross-object formulas",
            "Encrypt sensitive data"
          ],
          correct: 1,
          explanation: "Bucket fields let you group values into categories (like grouping amounts into 'Small', 'Medium', 'Large') without creating formula fields."
        },
        {
          question: "Cross filters in reports allow you to include or exclude records based on what?",
          options: ["Field values", "Date ranges", "Related records", "User permissions"],
          correct: 2,
          explanation: "Cross filters filter records based on whether they have related records. Example: 'Accounts WITH Opportunities' or 'Accounts WITHOUT Cases'."
        }
      ]
    },
    {
      id: 2,
      title: "Workflow/Process Automation",
      weight: "16%",
      color: "bg-purple-500",
      description: "Flow Builder, Process Builder, approval processes, and assignment rules",
      keyNotes: [
        "Flow Builder: Most powerful automation tool - use for all new automation",
        "Flow types: Screen (user interaction), Record-Triggered (before/after save), Auto-launched (no UI), Scheduled",
        "Before-save flows: Can update the triggering record without DML",
        "Process Builder: Legacy but still tested",
        "Approval processes: Multi-step approvals with email alerts and field updates",
        "Assignment rules: Automatically assign leads/cases based on criteria",
        "Escalation rules: Auto-escalate cases when criteria met"
      ],
      tips: "Build 5+ flows from scratch: 1 screen flow, 2 record-triggered (before & after), 1 scheduled. Create an approval process with 2 steps.",
      flashcards: [
        { q: "What's the difference between before-save and after-save record-triggered flows?", a: "Before-save: Runs before record is saved, can update triggering record without DML, faster. After-save: Runs after record is saved, needs DML to update triggering record." },
        { q: "When should you use Flow vs Process Builder vs Workflow?", a: "Flow: All new automation (most powerful). Process Builder: Legacy, don't use for new automations. Workflow: Old, very limited, avoid." }
      ],
      quiz: [
        {
          question: "What is the key difference between before-save and after-save record-triggered flows?",
          options: [
            "Before-save runs faster",
            "Before-save can update the triggering record without DML",
            "After-save has access to more fields",
            "Before-save can send emails"
          ],
          correct: 1,
          explanation: "Before-save flows run before the record is committed to the database, allowing you to update the triggering record without additional DML operations."
        },
        {
          question: "An admin needs to automatically assign new leads to sales reps based on state. What should be used?",
          options: ["Workflow rule", "Lead assignment rule", "Process Builder", "Auto-response rule"],
          correct: 1,
          explanation: "Lead assignment rules automatically assign leads to users or queues based on criteria."
        },
        {
          question: "Which automation tool is being phased out and should NOT be used for new automations?",
          options: ["Flow Builder", "Process Builder", "Approval Process", "Assignment Rules"],
          correct: 1,
          explanation: "Process Builder is legacy and Salesforce recommends using Flow Builder for all new automations."
        }
      ]
    },
    {
      id: 3,
      title: "Configuration & Setup",
      weight: "15%",
      color: "bg-green-500",
      description: "Company settings, user management, profiles, and permission sets",
      keyNotes: [
        "Profiles: Define baseline permissions. Every user must have exactly one profile",
        "Permission sets: ADD additional permissions. Users can have multiple permission sets",
        "License types: Salesforce (full CRM), Platform (custom apps only)",
        "Login hours: Restrict when users can log in",
        "Password policies: Minimum length, complexity, expiration",
        "Delegated administration: Allow non-admins to manage specific users/objects"
      ],
      tips: "Create test users with different profiles. Practice setting up login restrictions. Use permission sets for temporary access.",
      flashcards: [
        { q: "When should you use permission sets vs modifying profiles?", a: "Use permission sets when you need to grant additional access to specific users without changing the baseline profile." },
        { q: "What's the difference between Salesforce and Platform licenses?", a: "Salesforce license: Full CRM access. Platform license: Custom apps only, no standard Sales/Service objects." }
      ],
      quiz: [
        {
          question: "What is the primary difference between a profile and a permission set?",
          options: [
            "Profiles are newer than permission sets",
            "Every user must have one profile; permission sets are optional additions",
            "Permission sets are more restrictive",
            "Profiles can't control object access"
          ],
          correct: 1,
          explanation: "Every user must be assigned exactly one profile (baseline permissions). Permission sets are optional and add additional permissions."
        },
        {
          question: "A user needs temporary access to edit a custom object. What's the best solution?",
          options: ["Create a new profile", "Modify their existing profile", "Assign a permission set", "Change their role"],
          correct: 2,
          explanation: "Permission sets are perfect for temporary or exceptional access without affecting the user's base profile."
        }
      ]
    },
    {
      id: 4,
      title: "Object Manager & Lightning App Builder",
      weight: "15%",
      color: "bg-orange-500",
      description: "Custom objects, fields, relationships, and page layouts",
      keyNotes: [
        "Master-detail relationships: Parent required, cascade delete, roll-up summaries allowed, max 2 per object",
        "Lookup relationships: Parent optional, no cascade delete, independent sharing",
        "Roll-up summary fields: Only work with master-detail relationships",
        "Formula fields: Read-only calculated values",
        "Validation rules: Prevent bad data, fire before record save",
        "Record types: Different business processes for same object",
        "Field-level security: Control field visibility/editability by profile"
      ],
      tips: "Create a custom object with both master-detail and lookup relationships. Build formula fields and validation rules.",
      flashcards: [
        { q: "Master-detail vs Lookup: Key differences?", a: "Master-detail: Parent required, cascade delete, roll-up summaries, inherits sharing, max 2. Lookup: Parent optional, no cascade, no roll-ups, independent sharing." },
        { q: "When do validation rules fire?", a: "Before record is saved (insert or update). They can prevent save and show custom error messages." }
      ],
      quiz: [
        {
          question: "What is the maximum number of master-detail relationships an object can have?",
          options: ["1", "2", "5", "Unlimited"],
          correct: 1,
          explanation: "An object can have a maximum of 2 master-detail relationships. This is a hard limit in Salesforce."
        },
        {
          question: "Which relationship type allows roll-up summary fields?",
          options: ["Lookup only", "Master-detail only", "Both", "Hierarchical only"],
          correct: 1,
          explanation: "Roll-up summary fields can only be created on master objects in master-detail relationships."
        }
      ]
    },
    {
      id: 5,
      title: "Sales & Marketing Applications",
      weight: "10%",
      color: "bg-indigo-500",
      description: "Lead management, opportunities, campaigns, and products",
      keyNotes: [
        "Lead conversion: Creates Account, Contact, and optionally Opportunity",
        "Opportunity stages: Track sales progress with probability percentages",
        "Products and price books: Standard price book is default",
        "Campaign management: Track marketing efforts and attribution",
        "Sales processes: Control which opportunity stages are available"
      ],
      tips: "Practice lead conversion process. Create opportunities with products from price books.",
      flashcards: [
        { q: "What happens during lead conversion?", a: "Creates: Contact (always), Account (always unless existing), Opportunity (optional). Lead becomes read-only." },
        { q: "What are price books used for?", a: "Store product prices. Standard price book is default. Products must be in standard price book before custom." }
      ],
      quiz: [
        {
          question: "What records are always created during lead conversion?",
          options: [
            "Account, Contact, Opportunity",
            "Account and Contact only",
            "Contact and Opportunity only",
            "Only Account"
          ],
          correct: 1,
          explanation: "Lead conversion always creates an Account and a Contact. Opportunity creation is optional."
        }
      ]
    },
    {
      id: 6,
      title: "Service & Support Applications",
      weight: "10%",
      color: "bg-red-500",
      description: "Case management, knowledge, and service console",
      keyNotes: [
        "Case assignment rules: Auto-assign cases to users/queues. Only one rule can be active",
        "Case escalation rules: Auto-escalate cases when criteria met",
        "Web-to-case and Email-to-case: Create cases from website or email",
        "Knowledge: Article management with versions and categories",
        "Entitlements: Service contracts defining support levels",
        "Omni-Channel: Intelligent work routing based on capacity and skills"
      ],
      tips: "Set up case assignment and escalation rules. Create knowledge articles with data categories.",
      flashcards: [
        { q: "Case assignment rules vs escalation rules?", a: "Assignment rules: Auto-assign new cases when created. Escalation rules: Auto-escalate existing cases when criteria met." },
        { q: "What are entitlements?", a: "Service contracts defining support levels with milestones. Track if customer is entitled to support." }
      ],
      quiz: [
        {
          question: "How many case assignment rules can be active at one time?",
          options: ["Unlimited", "5", "1", "3"],
          correct: 2,
          explanation: "Only one case assignment rule can be active at a time, but it can contain multiple rule entries."
        }
      ]
    },
    {
      id: 7,
      title: "Productivity & Collaboration",
      weight: "9%",
      color: "bg-pink-500",
      description: "Chatter, activities, mobile app, and AppExchange",
      keyNotes: [
        "Chatter: Internal social network with posts, groups, @mentions, file sharing",
        "Tasks vs Events: Tasks are to-dos, Events are calendar appointments",
        "Salesforce mobile app: iOS/Android with offline access",
        "AppExchange: Managed packages (upgradable), Unmanaged packages (customizable)",
        "Content: File library with version control"
      ],
      tips: "Practice creating Chatter groups. Install an AppExchange package in your practice org.",
      flashcards: [
        { q: "Tasks vs Events?", a: "Tasks: To-dos with due dates. Events: Calendar appointments with start/end times." },
        { q: "Managed vs Unmanaged packages?", a: "Managed: Vendor controls, can upgrade. Unmanaged: Fully customizable, no upgrades." }
      ],
      quiz: [
        {
          question: "What is the difference between public and private Chatter groups?",
          options: [
            "Public groups are visible to everyone, private groups require membership",
            "Private groups are encrypted",
            "Public groups can't share files",
            "No difference"
          ],
          correct: 0,
          explanation: "Public Chatter groups are visible to all users. Private groups are only visible to members."
        }
      ]
    },
    {
      id: 8,
      title: "🆕 Agentforce AI",
      weight: "8%",
      color: "bg-cyan-500",
      description: "AI agents, Agent Builder, and AI security (NEW FOR 2026)",
      keyNotes: [
        "Agentforce: Salesforce's AI agents that autonomously handle tasks",
        "Use cases: Customer service chatbots, sales assistance, data analysis",
        "Agent Builder: Low-code tool to build and deploy AI agents",
        "When to use AI vs Flow: AI for generative tasks, Flow for deterministic automation",
        "AI security: Permission sets control agent access, data security applies",
        "Agent permissions: Require specific permission sets, respect security"
      ],
      tips: "Complete 'Agentforce for Administrators' Trailhead module. Practice identifying when AI vs Flow is appropriate.",
      flashcards: [
        { q: "When to use Agentforce AI vs Flow Builder?", a: "Agentforce: Conversational interfaces, generative content, natural language. Flow: Deterministic rules, predictable outcomes, structured data." },
        { q: "What is Agent Builder?", a: "Low-code tool to create AI agents. Define prompts (instructions), topics (capabilities), and actions (what agent can do)." }
      ],
      quiz: [
        {
          question: "When should you use Agentforce AI instead of Flow Builder?",
          options: [
            "Always use Agentforce",
            "For conversational, generative tasks with variable inputs",
            "Never use Agentforce",
            "Only for external customers"
          ],
          correct: 1,
          explanation: "Use Agentforce for conversational interfaces and generative tasks. Use Flow for deterministic, rule-based automation."
        },
        {
          question: "What percentage of the Admin exam covers Agentforce?",
          options: ["2%", "5%", "8%", "15%"],
          correct: 2,
          explanation: "Agentforce AI represents 8% of the Platform Administrator exam as of December 2025."
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('completedModules');
    if (saved) setCompletedModules(JSON.parse(saved));
  }, []);

  const saveProgress = (modules) => {
    localStorage.setItem('completedModules', JSON.stringify(modules));
    setCompletedModules(modules);
  };

  const progress = (completedModules.length / studyModules.length) * 100;

  const startModuleQuiz = (module) => {
    setCurrentModule(module);
    setCurrentQuiz(module.quiz);
    setCurrentQuestionIndex(0);
    setQuizAnswers(new Array(module.quiz.length).fill(null));
    setShowExplanation(false);
    setCurrentView('quiz');
  };

  const selectAnswer = (answerIndex) => {
    if (quizAnswers[currentQuestionIndex] === null) {
      const newAnswers = [...quizAnswers];
      newAnswers[currentQuestionIndex] = answerIndex;
      setQuizAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(quizAnswers[currentQuestionIndex + 1] !== null);
    } else {
      showResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(quizAnswers[currentQuestionIndex - 1] !== null);
    }
  };

  const showResults = () => {
    const score = quizAnswers.reduce((sum, answer, idx) => 
      sum + (answer === currentQuiz[idx].correct ? 1 : 0), 0
    );
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    if (percentage >= 80 && !completedModules.includes(currentModule.id)) {
      saveProgress([...completedModules, currentModule.id]);
    }
    
    setCurrentView('results');
  };

  const score = quizAnswers.reduce((sum, answer, idx) => 
    sum + (answer === currentQuiz[idx]?.correct ? 1 : 0), 0
  );
  const percentage = currentQuiz.length > 0 ? Math.round((score / currentQuiz.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl">
                ☁
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Salesforce Admin Cert Prep</h1>
                <p className="text-sm text-gray-600">Interactive Study Guide</p>
              </div>
            </div>
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Overall Progress</span>
                <span className="font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex gap-3 overflow-x-auto">
          <button
            onClick={() => setCurrentView('modules')}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              currentView === 'modules' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
            }`}
          >
            📚 Modules
          </button>
          <button
            onClick={() => setCurrentView('resources')}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
              currentView === 'resources' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
            }`}
          >
            📖 Resources
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Modules View */}
          {currentView === 'modules' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Study Modules</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyModules.map(module => (
                  <div
                    key={module.id}
                    onClick={() => {
                      setCurrentModule(module);
                      setCurrentView('detail');
                    }}
                    className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition cursor-pointer relative"
                  >
                    <div className={`absolute top-4 right-4 ${module.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {module.weight}
                    </div>
                    {completedModules.includes(module.id) && (
                      <div className="absolute top-4 left-4 text-green-500">
                        <CheckCircle size={24} />
                      </div>
                    )}
                    <h3 className="font-bold text-lg mb-2 pr-16">{module.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>📝 {module.keyNotes.length} notes</span>
                      <span>❓ {module.quiz.length} quiz</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module Detail View */}
          {currentView === 'detail' && currentModule && (
            <div>
              <button
                onClick={() => setCurrentView('modules')}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-4 hover:underline"
              >
                <ChevronLeft size={20} /> Back to Modules
              </button>
              <h2 className="text-3xl font-bold mb-4">{currentModule.title}</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-3">🔑 Key Concepts</h3>
                <ul className="space-y-2">
                  {currentModule.keyNotes.map((note, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg mb-6">
                <h4 className="font-bold mb-2">💡 Study Tips</h4>
                <p className="text-gray-700">{currentModule.tips}</p>
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => startModuleQuiz(currentModule)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  📝 Take Quiz ({currentModule.quiz.length} Questions)
                </button>
                <button
                  onClick={() => {
                    setCurrentFlashcardIndex(0);
                    setFlashcardFlipped(false);
                    setCurrentView('flashcards');
                  }}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🗂️ Study Flashcards
                </button>
              </div>
            </div>
          )}

          {/* Quiz View */}
          {currentView === 'quiz' && currentQuiz.length > 0 && (
            <div>
              <button
                onClick={() => setCurrentView('detail')}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-4 hover:underline"
              >
                <ChevronLeft size={20} /> Back
              </button>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                    Question {currentQuestionIndex + 1} of {currentQuiz.length}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{currentQuiz[currentQuestionIndex].question}</h3>
                
                <div className="space-y-3">
                  {currentQuiz[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = quizAnswers[currentQuestionIndex] === idx;
                    const isCorrect = idx === currentQuiz[currentQuestionIndex].correct;
                    const showResult = showExplanation;
                    
                    let className = 'p-4 border-2 rounded-lg cursor-pointer transition ';
                    if (showResult) {
                      if (isCorrect) className += 'border-green-500 bg-green-50';
                      else if (isSelected) className += 'border-red-500 bg-red-50';
                      else className += 'border-gray-200';
                    } else {
                      className += isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300';
                    }
                    
                    return (
                      <div key={idx} onClick={() => selectAnswer(idx)} className={className}>
                        <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
                      </div>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <h4 className="font-bold mb-2">💡 Explanation</h4>
                    <p>{currentQuiz[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 bg-gray-200 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  ← Previous
                </button>
                {showExplanation && (
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {currentQuestionIndex < currentQuiz.length - 1 ? 'Next →' : 'See Results'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Results View */}
          {currentView === 'results' && (
            <div className="text-center">
              <div className={`${percentage >= 80 ? 'bg-green-500' : percentage >= 65 ? 'bg-yellow-500' : 'bg-red-500'} text-white rounded-xl p-8 mb-6`}>
                <h2 className="text-6xl font-bold mb-2">{score}/{currentQuiz.length}</h2>
                <p className="text-2xl mb-2">{percentage}% Correct</p>
                <p className="text-lg">
                  {percentage >= 80 ? '🎉 Great job! Module completed!' : 
                   percentage >= 65 ? '👍 Passing score! Review and try again for mastery.' : 
                   '📚 Keep studying! Review the material and try again.'}
                </p>
              </div>
              
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => setCurrentView('detail')}
                  className="px-6 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ← Back to Module
                </button>
                <button
                  onClick={() => startModuleQuiz(currentModule)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  🔄 Retake Quiz
                </button>
              </div>
            </div>
          )}

          {/* Flashcards View */}
          {currentView === 'flashcards' && currentModule && (
            <div>
              <button
                onClick={() => setCurrentView('detail')}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-4 hover:underline"
              >
                <ChevronLeft size={20} /> Back to Module
              </button>
              
              <h2 className="text-2xl font-bold mb-4">🗂️ Flashcards</h2>
              <p className="mb-4 text-gray-600">Card {currentFlashcardIndex + 1} of {currentModule.flashcards.length} • Click to flip</p>
              
              <div
                onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                className={`min-h-[300px] border-2 rounded-xl p-8 flex items-center justify-center cursor-pointer transition ${
                  flashcardFlipped ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'
                }`}
              >
                <div className="text-center">
                  <p className="font-bold text-xl mb-4">{flashcardFlipped ? 'A:' : 'Q:'}</p>
                  <p className="text-lg">
                    {flashcardFlipped 
                      ? currentModule.flashcards[currentFlashcardIndex].a 
                      : currentModule.flashcards[currentFlashcardIndex].q}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    if (currentFlashcardIndex > 0) {
                      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
                      setFlashcardFlipped(false);
                    }
                  }}
                  disabled={currentFlashcardIndex === 0}
                  className="px-6 py-3 bg-gray-200 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-300 transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    if (currentFlashcardIndex < currentModule.flashcards.length - 1) {
                      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
                      setFlashcardFlipped(false);
                    }
                  }}
                  disabled={currentFlashcardIndex === currentModule.flashcards.length - 1}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-blue-700 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Resources View */}
          {currentView === 'resources' && (
            <div>
              <h2 className="text-3xl font-bold mb-6">📖 Study Resources</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-5 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-3">🎓 Free Official Resources</h3>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Trailhead:</strong> <a href="https://trailhead.salesforce.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">trailhead.salesforce.com</a> - Complete certification preparation trails</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Free Practice Org:</strong> <a href="https://developer.salesforce.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Get Developer Org</a> - Full-featured Salesforce environment</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Exam Guide:</strong> <a href="https://trailhead.salesforce.com/credentials/administrator" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Exam Guide</a> - Download PDF with objectives</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-3">💰 Recommended Paid Resources</h3>
                <ul className="space-y-2">
                  <li><strong>Focus on Force:</strong> Best practice exams ($19-40) - Most realistic questions</li>
                  <li><strong>Udemy:</strong> Video courses by Mike Wheeler or Shrey Sharma ($10-15)</li>
                  <li><strong>CertifiedOnDemand:</strong> Study guides and flashcards ($35-75)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
                <h4 className="font-bold mb-2">⚡ Quick Tips for Success</h4>
                <ul className="space-y-1 ml-5 list-disc">
                  <li>Hands-on practice is MORE important than reading</li>
                  <li>Focus on Data & Analytics (17% - highest weight)</li>
                  <li>Master Flow Builder - it's critical</li>
                  <li>Take 3+ practice tests scoring 75%+ before exam</li>
                  <li>Study Agentforce basics (new 8% section)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesforceStudyApp;
