import "./Sidebar.css";
import {
  SidebarIcon,
  DownArrowIcon,
  FoldersIcon,
  CheckListIcon,
  SettingsIcon,
  GroupIcon,
  PenIcon,
  MessageBoxIcon,
  HelpIcon,
  TeacherIcon,
  GraduateIcon,
  UpArrowIcon,
  MoonIcon,
  SunIcon,
  LogoutIcon,
  PlusIcon,
  StarIcon,
  UserIcon,
  SearchIcon,
  WorldIcon,
  CircularGraficIcon,
} from "../SVGImages/SVGImages.tsx";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainLogo } from "../../MainLogo.tsx";

interface SidebarProps {
  isOpen: boolean;
  toggle: (value: boolean) => void;
}

import { Dropdown } from "flowbite-react";
import { Course, UserContext } from "../../../UserContext.tsx";

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const [showGroup, setShowGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Course>({
    id: "all",
    name: "Grupos",
  });
  const { user, logout } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode ? "true" : "false");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  function getGroup() {
    if (selectedGroup.id === "all" || showGroup) {
      return (
        <>
          <GroupIcon style={"group-gray-icon"} />
          <span className={`sidebar-dropdown-item ${isOpen ? "" : "hidden"}`}>
            Grupos
          </span>
          {isOpen ? (showGroup ? UpArrowIcon() : DownArrowIcon()) : null}
        </>
      );
    } else {
      return (
        <>
          <TeacherIcon style={"group-gray-icon"} />
          <span className={`sidebar-dropdown-item ${isOpen ? "" : "hidden"}`}>
            {selectedGroup.name}
          </span>
          {isOpen ? (showGroup ? UpArrowIcon() : DownArrowIcon()) : null}
        </>
      );
    }
  }

  function showGrupOptions() {
    if (selectedGroup.id === "all") {
      return <></>;
    } else {
      return (
        <>
          <ul
            className={`${
              !showGroup && selectedGroup.id !== "all" ? "" : "hidden"
            } sidebar-dropdown transition-all`}
          >
            <li>
              <Link to={""}>
                <button className="sidebar-item bg-btn-1 group">
                  <GraduateIcon style={"group-gray-icon"} />
                  <span className={isOpen ? "" : "hidden"}>Alunos</span>
                </button>
              </Link>
            </li>
            <li>
              <Link to={""}>
                <button className="sidebar-item bg-btn-1 group">
                  <WorldIcon style={"group-gray-icon"} />
                  <span className={isOpen ? "" : "hidden"}>
                    Testes Partilhados
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <Link to={""}>
                <button className="sidebar-item bg-btn-1 group">
                  <CircularGraficIcon style={"group-gray-icon"} />
                  <span className={isOpen ? "" : "hidden"}>Avaliações</span>
                </button>
              </Link>
            </li>
          </ul>
        </>
      );
    }
  }

  return (
    <>
      <aside
        className={`sidebar-background bg-1-3 ${isOpen ? "" : "w-max"}`}
        aria-label="Sidebar"
      >
        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="sidebar-item bg-btn-1 w-auto"
            onClick={() => {
              toggle(!isOpen);
              setShowGroup(false);
            }}
          >
            <SidebarIcon style={"group-gray-icon"} />
          </button>
          <div className={` ${isOpen ? "" : "hidden"}`}>
            <Link to="/webapp">
              {" "}
              <MainLogo></MainLogo>
            </Link>
          </div>
        </div>

        <ul className="sidebar-divisions border-t-0">
          <li>
            <button className="relative inline-block text-lg group">
              {/*Bloco inicial*/}
              <span className="relative z-10 block px-3 py-3 overflow-hidden font-bold leading-tight transition-colors duration-500 ease-out border-2 text-gray-700 group-hover:text-white dark:text-gray-300 dark:group-hover:text-gray-800 bg-white group-hover:bg-gray-700 dark:bg-gray-800 dark:group-hover:bg-gray-500 border-gray-700 dark:border-gray-600 rounded-lg">
                {/*Bloco que surge*/}
                <span className="absolute left-0 w-64 h-64 -ml-2 transition-all duration-200 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-700 dark:bg-gray-300 group-hover:-rotate-180 ease"></span>
                {/*Conteudo*/}
                <span className="relative flex space-x-2 items-center">
                  <PlusIcon
                    style={
                      "group-hover:text-white text-gray-700 dark:text-gray-300 dark:group-hover:text-black transition-colors duration-500"
                    }
                  ></PlusIcon>

                  <p
                    className={`${
                      isOpen ? "" : "hidden"
                    } ease-linear duration-100`}
                  >
                    Novo Teste
                  </p>
                </span>
              </span>
              {/*Sombra*/}
              <span
                className={`${isOpen ? " h-12" : "h-11"}
                absolute bottom-0 right-0 w-full -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-500 dark:bg-gray-400 rounded-lg group-hover:mb-0 group-hover:mr-0`}
                data-rounded="rounded-lg"
              ></span>
            </button>
          </li>
          <li>
            <Link to={"tests"}>
              <button className="sidebar-item bg-btn-1 group">
                <SearchIcon style={"group-gray-icon"} />
                <span className={isOpen ? "" : "hidden"}>
                  Procurar conteúdos
                </span>
              </button>
            </Link>
          </li>
          <li>
            <Link to={"tests"}>
              <button className="sidebar-item bg-btn-1 group">
                <CheckListIcon style={"group-gray-icon"} />
                <span className={isOpen ? "" : "hidden"}>Os meus testes</span>
              </button>
            </Link>
          </li>
          <li>
            <Link to={"exercise-bank"}>
              <button className="sidebar-item bg-btn-1 group">
                <PenIcon style={"group-gray-icon"} />
                <span className={isOpen ? "" : "hidden"}>
                  Banco de Exercícios
                </span>
              </button>
            </Link>
          </li>
        </ul>

        <ul className="sidebar-divisions border-gray-3">
          <li>
            <button
              type="button"
              onClick={() => {
                toggle(true);
                setShowGroup(!showGroup);
              }}
              className="sidebar-item bg-btn-1 group"
            >
              {getGroup()}
            </button>

            <ul className={`${showGroup ? "" : "hidden"} sidebar-dropdown`}>
              <li>
                <button
                  onClick={() => {
                    setShowGroup(false);
                    setSelectedGroup({
                      id: "all",
                      name: "Grupos",
                    });
                  }}
                  className={`sidebar-item ${
                    "all" === selectedGroup.id
                      ? "bg-btn-1-selected"
                      : "bg-btn-1"
                  } group`}
                >
                  <GroupIcon style={"group-gray-icon"} />
                  <span className={isOpen ? "" : "hidden"}>Geral</span>
                </button>
              </li>
              {user.user?.courses.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setShowGroup(false);
                      setSelectedGroup(item);
                    }}
                    className={`sidebar-item ${
                      item === selectedGroup ? "bg-btn-1-selected" : "bg-btn-1"
                    } group`}
                  >
                    <TeacherIcon style={"group-gray-icon"} />
                    <span className={isOpen ? "" : "hidden"}>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            {showGrupOptions()}
          </li>
        </ul>

        <div className="sidebar-divisions border-gray-3 mt-auto">
          <ul>
            <li onClick={() => toggle(true)}>
              <Dropdown
                label=""
                placement="top"
                renderTrigger={() => (
                  <button className="sidebar-item bg-btn-1 group">
                    <img
                      src={user.user?.profilePic ?? ""}
                      className={`${
                        isOpen ? "w-10 h-10 " : "size-6"
                      } rounded-full ease-linear duration-75`}
                      alt="user photo"
                    />

                    <span className={isOpen ? "" : "hidden"}>
                      {user.user?.name}
                    </span>
                  </button>
                )}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.user?.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.user?.email}
                  </span>
                </Dropdown.Header>

                <Dropdown.Item
                  as="button"
                  className=" group"
                  onClick={() => navigate("profile")}
                >
                  <UserIcon style={"group-gray-icon"} />
                  <span className={`${isOpen ? "" : "hidden"} ml-2`}>
                    Profile Page
                  </span>
                </Dropdown.Item>
                <Dropdown.Item as="button" className=" group">
                  <StarIcon style={"group-gray-icon"} />
                  <span className={`${isOpen ? "" : "hidden"} ml-2`}>
                    Upgrade!
                  </span>
                </Dropdown.Item>
                <Dropdown.Item as="button" className=" group">
                  <HelpIcon style={"group-gray-icon"} />
                  <span className={`${isOpen ? "" : "hidden"} ml-2`}>Help</span>
                </Dropdown.Item>
                <Dropdown.Item as="button" className=" group" onClick={logout}>
                  <LogoutIcon style={"group-gray-icon"} />
                  <span
                    className={`${isOpen ? "" : "hidden"} text-red-700 ml-3`}
                  >
                    Log out
                  </span>
                </Dropdown.Item>
              </Dropdown>
            </li>

            <li>
              <button
                className="sidebar-item bg-btn-1 group"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <>
                    <SunIcon style={"group-gray-icon"}></SunIcon>
                    <span className={isOpen ? "" : "hidden"}>
                      Light Mode Toogle
                    </span>
                  </>
                ) : (
                  <>
                    <MoonIcon style={"group-gray-icon"}></MoonIcon>{" "}
                    <span className={isOpen ? "" : "hidden"}>
                      Dark Mode Toogle
                    </span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
