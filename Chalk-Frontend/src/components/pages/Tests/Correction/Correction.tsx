import "./Correction.css";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { TestPreview } from "../TestPreview";
import {
  ExerciseJustificationKind,
  ExerciseType,
  Resolution,
  ResolutionType,
  TranslateTestExerciseIN,
} from "../../../objects/Exercise/Exercise";
import { Answer } from "../../../objects/Answer/Answer";
import {
  Rubric,
  RubricContext,
  StardardLevels,
} from "../../../objects/Rubric/Rubric";
import { TextareaBlock } from "../../../interactiveElements/TextareaBlock";
import { LuGhost } from "react-icons/lu";
import { InitTest, Test } from "../../../objects/Test/Test";
import { APIContext } from "../../../../APIContext";
import { useParams } from "react-router-dom";

export interface Resolutions {
  [exerciseID: string]: {
    solution?: Resolution;
    rubric?: Rubric;
    position?: string;
    cotation: number;
    studentRes: { [resolutionID: string]: Resolution };
  };
}

function renderResolutions(
  resolutions: Resolutions,
  exID: string,
  setExId: Function
) {
  const [selResolution, selectRes] = useState<Resolution | undefined>();
  const [auxEx, setAux] = useState<string>(exID);

  useEffect(() => {
    if (exID !== auxEx) selectRes(undefined);
  }, [exID]);

  const selectResolution = (exID: string, resID: string) => {
    selectRes(resolutions[exID].studentRes[resID]);
    setExId(exID);
    setAux(exID);
  };

  const backToList = () => {
    selectRes(undefined);
    setAux("");
    setExId("");
  };

  if (Object.keys(resolutions).length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-xl text-gray-500">
          Não existem mais resoluções para corrigir neste teste.
        </p>
      </div>
    );
  } else {
    return selResolution !== undefined && exID !== ""
      ? renderResolution(selResolution, resolutions[exID].cotation, backToList)
      : renderResolutionList(resolutions, selectResolution);
  }
}

function renderResolutionList(resolutions: Resolutions, setExId: Function) {
  return (
    <div className="overflow-y-scroll">
      <h3 className="text-xl font-medium">Resoluções por corrigir</h3>
      <div className="flex-col space-y-4">
        {Object.keys(resolutions).map((key1, index1) => {
          return (
            <div key={index1} className="flex-col space-y-4">
              <p className="text-xl font-medium border-b-2 border-slate-700">
                Exercício {resolutions[key1].position ?? key1}
              </p>
              {Object.keys(resolutions[key1].studentRes).map((key2, index2) => {
                return (
                  <div
                    key={index2}
                    className="p-8 rounded-lg bg-3-2 flex cursor-pointer"
                    onClick={() => setExId(key1, key2)}
                  >
                    Resolução {resolutions[key1].studentRes[key2].student?.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function renderResolution(
  resolution: Resolution,
  cotation: number,
  backToList: Function
) {
  return (
    <div className="flex flex-col w-full space-y-4 h-full">
      <div className="flex items-center space-x-2 justify-between">
        <div className="flex items-center space-x-2">
          <div
            className=" rounded-full hover:bg-gray-600 p-2 cursor-auto"
            onClick={() => backToList()}
          >
            <FaArrowLeft />
          </div>
          <h1 className="text-xl">Resolução de {resolution.student?.name}</h1>
        </div>
        <button type="button" className="p-4 bg-yellow-200">
          <p className="text-sm">Assistência na Correção</p>
        </button>
      </div>

      <h2>
        <strong>Aluno</strong>: {resolution.student?.name}
      </h2>
      <label className="font-bold">Resposta:</label>
      <div className="bg-white rounded-lg border-2 border-gray-600 p-1">
        <Answer solution={resolution} />
      </div>
      <label className="font-bold">Comentário:</label>
      <TextareaBlock className="bg-white rounded-lg border-2 border-gray-600"></TextareaBlock>

      <div className="flex space-x-2 items-center">
        <label className="font-bold">Nota:</label>
        <input
          id={resolution.id + "grade"}
          className="bg-white rounded-lg border-2 border-gray-600"
          type="number"
          max={cotation}
        ></input>
        <p> Cotação máxima: {cotation}</p>
      </div>

      <button
        type="button"
        className="p-3 bg-yellow-300 rounded-md mt-auto"
        onClick={() => backToList()}
      >
        Submit
      </button>
    </div>
  );
}

function renderSolution(resolutions: Resolutions, exid: string) {
  if (exid !== "")
    return (
      <>
        {exid in resolutions && resolutions[exid].rubric ? (
          <Rubric
            context={{ context: RubricContext.PREVIEW }}
            rubric={resolutions[exid].rubric!}
          />
        ) : (
          <div className="flex h-max items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <LuGhost size={120} />
              <p className="text-xl">Rúbrica não encontrada!</p>
            </div>
          </div>
        )}
      </>
    );
  else
    return (
      <p className="text-gray-600">
        Selecione um exercício para ver os seus críterios de correção
      </p>
    );
}

export function Correction() {
  const [test, setTest] = useState<Test>(InitTest());
  const [resolutions, setResolutions] = useState<Resolutions>({});
  const [exID, setExID] = useState<string>("");
  const { contactBACK } = useContext(APIContext);
  const { testID } = useParams();

  const setRubric = (id: string, rubric: Rubric) => {
    let cpyResolutions = { ...resolutions };
    if (id in resolutions) {
      cpyResolutions[id] = { ...cpyResolutions[id], rubric: rubric };
    } else {
      cpyResolutions[id] = {
        rubric: rubric,
        cotation: 0,
        studentRes: {},
      };
    }
    setResolutions(cpyResolutions);
  };

  useEffect(() => {
    contactBACK("tests/" + testID, "GET").then((response) => {
      response.json().then((testJson: any) => {
        testJson.groups = testJson.groups.map((group: any) => {
          group.exercises = group.exercises.map((ex: any) => {
            return TranslateTestExerciseIN(ex);
          });
          return group;
        });
        setTest(testJson);
      });
    });
  }, []);

  useEffect(() => {
    if (exID !== "" && !(exID in resolutions)) {
      contactBACK("exercises/" + exID + "/rubric", "GET")
        .then((response) => {
          response
            .json()
            .then((json) => {
              if (json.type === "OA" || json.type === "CE") {
                contactBACK("exercises/" + exID + "/resolutions", "GET", {
                  page: "0",
                  itemsPerPage: "50",
                  onlyNotRevised: "true",
                }).then((response2) => {
                  response2
                    .json()
                    .then((resJson) => {
                      console.log(resJson);
                    })
                    .catch(() => {});
                });
                setRubric(exID, json);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }, [exID]);

  return (
    <>
      <div className="h-screen overflow-auto">
        <div className="flex flex-col w-full gap-4 min-h-max bg-2-1 ">
          <div className="flex w-full justify-between border-gray-2-2 dark:text-white">
            {/*
                Test Preview
            */}
            <div className="w-full flex flex-row divide-x-2 border-gray-2-2">
              <div className="flex flex-col w-3/4 h-screen overflow-auto bg-2-1 px-4 pt-6">
                <h1 className="text-3xl font-medium">
                  Correção do teste: {test.title}
                </h1>
                <TestPreview
                  test={test}
                  setShowExID={setExID}
                  showExId={exID}
                ></TestPreview>
              </div>

              <div
                className={`w-full flex flex-col h-screen overflow-auto bg-2-1`}
              >
                <div className="p-4 flex flex-col w-full h-screen space-y-4">
                  {/* Solução se houver */}
                  <div className="bg-3-1 w-full space-y-3 min-h-[30%] max-h-[40%] rounded-lg p-4 overflow-y-auto">
                    <h3 className="text-xl font-medium">
                      Critérios de Correção
                    </h3>
                    {renderSolution(resolutions, exID)}
                  </div>
                  {/* Resoluçoes */}
                  <div className=" bg-3-1 w-full h-full rounded-lg p-4">
                    {renderResolutions(resolutions, exID, setExID)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
