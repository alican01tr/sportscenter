const Header = ({ activeTab, onTabChange, onAddMemberClick }: { activeTab: string, onTabChange: (tab: string) => void, onAddMemberClick: () => void }) => {
    return (
      <header className="bg-blue-600 text-white py-4 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Spor Salonu Üye Takip Sistemi</h1>
          <nav className="w-full sm:w-auto">
            <ul className="flex flex-wrap justify-center sm:justify-end space-x-1">
              <li>
                <a
                  href="#"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-white/30 font-semibold'
                      : 'hover:bg-white/20'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange('dashboard');
                  }}
                >
                  Anasayfa
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'members'
                      ? 'bg-white/30 font-semibold'
                      : 'hover:bg-white/20'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange('members');
                    onAddMemberClick();
                  }}
                >
                  Üye Ekle
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  };

  export default Header;
