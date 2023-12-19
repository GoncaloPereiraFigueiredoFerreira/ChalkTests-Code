import { createContext, useContext, useEffect, useState } from "react";
import {
  ExerciseComponent,
  ExerciseContext,
  ExerciseGroup,
  ExerciseJustificationKind,
  ExerciseType,
  Resolution,
  ResolutionData,
  ResolutionItems,
  ResolutionStatus,
  SolveProps,
} from "../../objects/Exercise/Exercise";

export interface Test {
  type: string;
  conclusion: string;
  author: string;
  title: string;
  creationDate: string;
  globalCotation: number;
  globalInstructions: string;
  groups: ExerciseGroup[];
}

const basictest: Test = {
  type: "basic",
  conclusion: "",
  author: "JCR",
  title: "Teste de Avaliação de Geografia",
  creationDate: "22/08/2023",
  globalCotation: 20.0,
  globalInstructions: "Teste muito dificil. Tais todos fodidos!",
  groups: [
    {
      exercises: [
        {
          id: "11111",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.OPEN_ANSWER,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "22222",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com França?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "Portugal" },
            2: { text: "Polo norte" },
            3: { text: "Pigs" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.TRUE_OR_FALSE,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "3333",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.TRUE_OR_FALSE,
          justifyKind: ExerciseJustificationKind.JUSTIFY_FALSE,
        },
      ],
      groupCotation: 3,
      groupInstructions:
        "Neste grupo serão apresentadas 2 exercícios de geografia!Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus mollis ante vitae felis efficitur blandit. Etiam maximus aliquet nisi eget lacinia. Quisque iaculis ligula purus, ac euismod arcu ultrices sit amet. Pellentesque id tortor pulvinar, fringilla dolor quis, molestie nibh. Donec molestie massa ut eros sollicitudin vehicula. Duis convallis, eros sit amet cursus pellentesque, ipsum orci vestibulum leo, at sodales massa lorem vitae ipsum. Nullam pharetra ullamcorper nisi id cursus. Morbi at mauris vitae risus consectetur ultrices pulvinar eu metus. Nullam pellentesque dictum hendrerit. Nunc felis nisi, auctor vitae dapibus sit amet, hendrerit vitae mauris. Cras in tempus sem. Ut vehicula risus at arcu eleifend eleifend.",
    },
    {
      exercises: [
        {
          id: "11111",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.OPEN_ANSWER,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "22222",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com França?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "Portugal" },
            2: { text: "Polo norte" },
            3: { text: "Pigs" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.OPEN_ANSWER,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "3333",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.MULTIPLE_CHOICE,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
      ],
      groupCotation: 16,
      groupInstructions:
        "Neste grupo serão apresentadas 2 exercícios de geografia!Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus mollis ante vitae felis efficitur blandit. Etiam maximus aliquet nisi eget lacinia. Quisque iaculis ligula purus, ac euismod arcu ultrices sit amet. Pellentesque id tortor pulvinar, fringilla dolor quis, molestie nibh. Donec molestie massa ut eros sollicitudin vehicula. Duis convallis, eros sit amet cursus pellentesque, ipsum orci vestibulum leo, at sodales massa lorem vitae ipsum. Nullam pharetra ullamcorper nisi id cursus. Morbi at mauris vitae risus consectetur ultrices pulvinar eu metus. Nullam pellentesque dictum hendrerit. Nunc felis nisi, auctor vitae dapibus sit amet, hendrerit vitae mauris. Cras in tempus sem. Ut vehicula risus at arcu eleifend eleifend.",
    },
    {
      exercises: [
        {
          id: "11111",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.OPEN_ANSWER,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "22222",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com França?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "Portugal" },
            2: { text: "Polo norte" },
            3: { text: "Pigs" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.OPEN_ANSWER,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
        {
          id: "3333",
          specialistId: "JCR",
          cotation: 1,
          visibility: "public",
          statement: {
            text: "Qual o país que faz fronteira com Portugal?",
          },
          title: "Vizinhos",
          items: {
            1: { text: "França" },
            2: { text: "Espanha" },
            3: { text: "Argentina" },
            4: { text: "Setúbal" },
          },
          type: ExerciseType.MULTIPLE_CHOICE,
          justifyKind: ExerciseJustificationKind.NO_JUSTIFICATION,
        },
      ],
      groupCotation: 1,
      groupInstructions:
        "Neste grupo serão apresentadas 2 exercícios de geografia!Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus mollis ante vitae felis efficitur blandit. Etiam maximus aliquet nisi eget lacinia. Quisque iaculis ligula purus, ac euismod arcu ultrices sit amet. Pellentesque id tortor pulvinar, fringilla dolor quis, molestie nibh. Donec molestie massa ut eros sollicitudin vehicula. Duis convallis, eros sit amet cursus pellentesque, ipsum orci vestibulum leo, at sodales massa lorem vitae ipsum. Nullam pharetra ullamcorper nisi id cursus. Morbi at mauris vitae risus consectetur ultrices pulvinar eu metus. Nullam pellentesque dictum hendrerit. Nunc felis nisi, auctor vitae dapibus sit amet, hendrerit vitae mauris. Cras in tempus sem. Ut vehicula risus at arcu eleifend eleifend.",
    },
  ],
};

function CountExercises(test: Test) {
  let result: number = 0;
  test.groups.map((group: any) => {
    result += group.exercises.length;
  });
  return result;
}

function Progress(test: Test, currentGroup: number, currentEx: number) {
  let nExercises = CountExercises(test);
  let pastExercises = currentEx;
  test.groups.map((value, index) => {
    if (index < currentGroup - 1) pastExercises += value.exercises.length;
  });

  return (pastExercises / nExercises) * 100;
}

function SolveTestLanding(props: any) {
  const { test } = useContext(SolveTestContext);
  let nExercises = CountExercises(test);
  return (
    <>
      <div className="space-y-12 w-full  dark:text-white">
        <div className="space-y-2 ">
          <p className="text-xl">
            <strong>Título:</strong> {test.title}
          </p>
          <p className="text-xl">
            <strong>Autor:</strong> {test.author}
          </p>
          <p className="text-xl">
            <strong>Data:</strong> {test.creationDate}
          </p>
          <div className="text-xl flex space-x-4">
            <strong>Tópicos:</strong>{" "}
            <p className=" border border-gray-400 rounded-lg "> RPCW</p>
          </div>
        </div>

        <div className="w-full">
          <h2 className=" font-bold text-md">Instruções básicas do teste:</h2>

          <p className="w-full border-2 rounded-lg border-gray-200 p-4">
            {test.globalInstructions}
          </p>
        </div>
        <p>
          <strong>Número de exercicios:</strong> {nExercises}
        </p>

        <button
          className="absolute right-4 bottom-4 p-4 rounded-lg bg-blue-300  dark:bg-blue-800"
          onClick={() => props.startTest(true)}
        >
          Começar o teste {"->"}
        </button>
        <div className="absolute right-4 top-0 text-2xl">
          <p>Cotação máxima: {test.globalCotation} valores</p>
          <p>Duração da prova: {test.globalCotation} minutos</p>
        </div>
      </div>
    </>
  );
}

function SolveTestExercise({ endTest }: any) {
  const [currentGroup, setCurrentGroup] = useState(1);
  const [currentEx, setCurrentEx] = useState(1);
  const { test, resolutions, setExerciseSolution } =
    useContext(SolveTestContext);

  let groupData = test.groups[currentGroup - 1];
  let exerciseData = groupData.exercises[currentEx - 1];

  let exerciseContext: SolveProps = {
    context: ExerciseContext.SOLVE,
    resolutionData: resolutions[currentGroup - 1][currentEx - 1],
    setExerciseSolution: (resolution: Resolution) => {
      setExerciseSolution(currentGroup, currentEx, resolution);
    },
  };

  return (
    <>
      <div className="mb-6 ">
        <div className="flex justify-between mb-1"></div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-yellow-300 h-2.5 rounded-full"
            style={{ width: Progress(test, currentGroup, currentEx) + "%" }}
          ></div>
        </div>
      </div>

      <div className="w-full relative border-b-2 pb-4 dark:text-white">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Grupo {currentGroup}</h1>

          <h2 className="ml-5 text-justify">{groupData.groupInstructions}</h2>
        </div>
        <p className="absolute right-4 top-0 text-xl ">
          Cotação do Grupo: {groupData.groupCotation} valores
        </p>
      </div>

      <div className=" relative ml-8 dark:text-white">
        <p className="absolute right-4 top-3 text-xl ">
          Cotação do Exercício: {exerciseData.cotation} valores
        </p>
      </div>
      <div className="mb-10">
        <ExerciseComponent
          context={exerciseContext}
          exercise={exerciseData}
          position={currentGroup + "." + currentEx}
        />
      </div>
      <div className="absolute right-4 bottom-4 space-x-5 dark:text-white ">
        {currentEx > 1 || currentGroup > 1 ? (
          <button
            type="button"
            className="p-4 rounded-lg bg-blue-300 dark:bg-blue-800"
            onClick={() => {
              if (currentGroup > 1 && currentEx == 1) {
                setCurrentEx(test.groups[currentGroup - 2].exercises.length);
                setCurrentGroup(currentGroup - 1);
              } else setCurrentEx(currentEx - 1);
            }}
          >
            Exercício Anterior
          </button>
        ) : (
          <></>
        )}
        {currentEx < groupData.exercises.length ||
        currentGroup < test.groups.length ? (
          <button
            type="button"
            className="p-4 rounded-lg bg-blue-300 dark:bg-blue-800"
            onClick={() => {
              if (
                currentGroup < test.groups.length &&
                currentEx == groupData.exercises.length
              ) {
                setCurrentEx(1);
                setCurrentGroup(currentGroup + 1);
              } else setCurrentEx(currentEx + 1);
            }}
          >
            Próximo Exercício
          </button>
        ) : (
          <></>
        )}

        <button
          type="button"
          className="p-4 rounded-lg bg-red-300  dark:bg-red-800"
          onClick={() => {
            endTest(true);
          }}
        >
          Finalizar Teste
        </button>
      </div>
    </>
  );
}

function SolveTestEnd() {
  const context = useContext(SolveTestContext);
  return (
    <div className="dark:text-white">
      <p className="text-2xl m-20">
        <strong>Completaste o teu teste!</strong>
      </p>
      <p className="ml-20 ">
        Verifica na página das avaliações a tua performance!
      </p>

      <p className="ml-20 ">{context.test.conclusion}</p>
    </div>
  );
}

function initResolutions(test: Test): ResolutionData[][] {
  let initResolution: ResolutionData[][] = [];

  test.groups.map((group, groupID) => {
    let groupRes: ResolutionData[] = [];
    initResolution.push(groupRes);

    group.exercises.map((exercise) => {
      switch (exercise.type) {
        case ExerciseType.MULTIPLE_CHOICE:
          let tempItemsMC: ResolutionItems = {};

          Object.keys(exercise.items!).map((key) => {
            tempItemsMC[key] = {
              text: exercise.items![key].text,
              justification: "",
              value: false,
            };
          });

          initResolution[groupID].push({
            type: ExerciseType.MULTIPLE_CHOICE,
            items: tempItemsMC,
          });
          break;

        case ExerciseType.TRUE_OR_FALSE:
          let tempItemsTF: ResolutionItems = {};

          Object.keys(exercise.items!).map((key) => {
            tempItemsTF[key] = {
              text: exercise.items![key].text,
              justification: "",
            };
          });

          initResolution[groupID].push({
            type: ExerciseType.TRUE_OR_FALSE,
            items: tempItemsTF,
          });
          break;

        case ExerciseType.OPEN_ANSWER:
          initResolution[groupID].push({
            type: ExerciseType.OPEN_ANSWER,
            text: "",
          });
          break;
      }
    });
  });
  return initResolution;
}

export function SolveTest() {
  const [started, startTest] = useState(false);
  const [ended, endTest] = useState(false);
  const [test, setTest] = useState<Test>(basictest);

  // Fill in the resolution data with undefined to avoid errors

  const [resolutions, setResolution] = useState<ResolutionData[][]>(
    initResolutions(test)
  );

  const setExerciseResolution = (
    groupID: number,
    exerciseID: number,
    resolutionData: ResolutionData
  ) => {
    let tmpRes = [...resolutions];
    let tmpRes2 = [...tmpRes[groupID - 1]];
    tmpRes2[exerciseID - 1] = resolutionData;
    tmpRes[groupID - 1] = tmpRes2;
    setResolution(tmpRes);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4 min-h-max px-16 pb-8 bg-2-1 h-screen">
        <div className="flex w-full justify-between px-4 pb-6 mb-3 border-b-2 border-gray-2-2 mt-10">
          <label className="flex text-title-1">Teste de Avaliação</label>
        </div>
        <div className="flex rounded-lg bg-1-1 h-full">
          <div className="m-7 relative w-full ">
            <SolveTestContext.Provider
              value={{
                test: test,
                resolutions: resolutions,
                setExerciseSolution: setExerciseResolution,
              }}
            >
              {!started ? (
                <SolveTestLanding startTest={startTest}></SolveTestLanding>
              ) : (
                <>
                  {!ended ? (
                    <SolveTestExercise endTest={endTest}></SolveTestExercise>
                  ) : (
                    <SolveTestEnd></SolveTestEnd>
                  )}
                </>
              )}
            </SolveTestContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

const SolveTestContext = createContext<{
  test: Test;
  resolutions: ResolutionData[][];
  setExerciseSolution: Function;
}>({
  test: {
    type: "",
    conclusion: "",
    author: "",
    title: "",
    creationDate: "",
    globalCotation: 0,
    globalInstructions: "",
    groups: [],
  },
  resolutions: [],
  setExerciseSolution: () => {},
});