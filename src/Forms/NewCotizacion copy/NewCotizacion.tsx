// "use client";
// import InputField from "@/components/InputField/InputField";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "./NewCotizacion.scss";
// import InputFieldUnit from "@/components/InputFieldUnit/InputFieldUnit";

// export default function NewCotizacion(props: any) {
//   const { modal } = props;

//   const { register, handleSubmit } = useForm();

//   const [page, setPage] = useState(0);
//   const [aguaPotable, setAguaPotable] = useState(false);
//   const [aguaResidual, setAguaResidual] = useState(false);
//   const [aguaReuso, setAguaReuso] = useState(false);
//   const [index, setIndex] = useState(["Registro de Obra"]);

//   const lastPage = index.length - 1;
//   const [progress, setProgress] = useState((index.length / lastPage) * 100);

//   const leSubmit = handleSubmit((data: any) => {
//     console.log(data);
//     modal.setViewForm(false);
//   });

//   const handleNext = () => {
//     if (index.length === lastPage) return setPage(lastPage);

//     setPage(index.length + 1);
//     setProgress(((index.length + 1) / lastPage) * 100);
//   };

//   const handlePrev = () => {
//     if (index.length === 0) return setPage(0);
//     setPage(index.length - 1);
//     setProgress(((index.length - 1) / lastPage) * 100);
//   };

//   const handleAguaPage = () => {
//     const pageTitle ="Sistemas de Agua / PTA"
//     setAguaPotable(!aguaPotable);
//     if (aguaPotable) {
//       const newIndex = [...index, pageTitle]
//       setIndex(newIndex)
//     }
//     if (!aguaPotable) {
//       const newIndex = index.filter((page) => page !== pageTitle);
//       // [...index, pageTitle]
//       setIndex(newIndex)

//     }
//     console.log(aguaPotable)
//   };

//   const handleResidualPage = () => {
//     const pageTitle ="Sistemas de Agua Residual / PTAR"
//     setAguaResidual(!aguaResidual);
//     if (aguaResidual) {
//       const newIndex = [...index, pageTitle]
//       setIndex(newIndex)
//     }
//     if (!aguaResidual) {
//       const newIndex = index.filter((page) => page !== pageTitle);
//       // [...index, pageTitle]
//       setIndex(newIndex)
//     }
//   };

//   const handleReusoPage = () => {
//     const pageTitle ="Sistemas de Reuso / PTAR"
//     setAguaReuso(!aguaReuso);
//     if (aguaReuso) {
//       const newIndex = [...index, pageTitle]
//       setIndex(newIndex)
//     }
//     if (!aguaReuso) {
//       const newIndex = index.filter((page) => page !== pageTitle);
//       // [...index, pageTitle]
//       setIndex(newIndex)
//     }
//   };

//   return (
//     <div className="cotizacionForm">
//       <pre>
//         {index}
//       </pre>
//       <div className="formTitle">
//         <h2>Estimacion de Proyecto</h2>
//         <button onClick={() => modal.setViewForm(false)}>x</button>
//       </div>
//       <form onSubmit={leSubmit}>
//         <div className="progress-bar">
//           <div className="progress" style={{ width: `${progress}%` }}></div>
//         </div>
//         <div className="subtitle">
//           <h4>{index[page]}</h4>
//         </div>

//         {page === 0 && (
//           <fieldset className="ProjectInfo">
//             <InputField
//               name="name"
//               label="Nombre del proyecto"
//               type="text"
//               register={register}
//             />

//             <InputField
//               name="location"
//               label="Ubicacion del proyecto"
//               type="text"
//               register={register}
//             />
//             <InputField
//               name="Fecha de arranque"
//               label="Nombre"
//               type="date"
//               register={register}
//             />

//             <div className="sistemOptions">
//               <div className="inputCheck">
//                 <input
//                   type="checkbox"
//                   id="sistemas-agua"
//                   name="sistemas-agua"
//                   checked={aguaPotable}
//                   onChange={handleAguaPage}
//                 />
//                 <label htmlFor="">Sistemas de Agua / PTA</label>
//               </div>
//               <div className="inputCheck">
//                 <input
//                   type="checkbox"
//                   id="sistemas-agua"
//                   name="sistemas-agua"
//                   checked={aguaResidual}
//                   onChange={handleResidualPage}
//                 />
//                 <label htmlFor="">Sistemas de Agua Residual / PTAR</label>
//               </div>
//               <div className="inputCheck">
//                 <input
//                   type="checkbox"
//                   id="sistemas-agua"
//                   name="sistemas-agua"
//                   checked={aguaReuso}
//                   onChange={handleReusoPage}
//                 />
//                 <label htmlFor="">Sistemas de Reuso / PTAR</label>
//               </div>
//             </div>
//           </fieldset>
//         )}
//         {page === 1 && (
//           <>
//             <fieldset className="ProjectData">
//               <InputFieldUnit
//                 isRequired={true}
//                 name="filtracion"
//                 label="Sistema de filtracion"
//                 type="number"
//                 register={register}
//               />

//               <InputFieldUnit
//                 name="suavisador"
//                 label="Sistema suavisador"
//                 type="number"
//                 register={register}
//               />
//               <InputFieldUnit
//                 name="osmosis"
//                 label="Sistema de Osmosis"
//                 type="number"
//                 register={register}
//               />
//             </fieldset>
//           </>
//         )}

//         {page === 2 && (
//           <>
//             <fieldset className="ProjectData">
//               <InputFieldUnit
//                 name="pretratamiento"
//                 label="Pretratamiento"
//                 type="number"
//                 register={register}
//               />
//               <InputFieldUnit
//                 name="lodosActivados"
//                 label="Lodos Activados"
//                 type="number"
//                 register={register}
//               />
//               <InputFieldUnit
//                 name="bioFiltracion"
//                 label="Bio Filtracion"
//                 type="number"
//                 register={register}
//               />
//               <InputFieldUnit
//                 name="mbbr"
//                 label="MBBR"
//                 type="number"
//                 register={register}
//               />
//             </fieldset>
//           </>
//         )}

//         {page === 3 && (
//           <>
//             <fieldset className="ProjectData">
//               <InputFieldUnit
//                 name="osmosisReuso"
//                 label="Osmosis Inversa"
//                 type="number"
//                 register={register}
//               />
//               <InputFieldUnit
//                 name="ultrafiltracion"
//                 label="Ultrafiltracion"
//                 type="number"
//                 register={register}
//               />
//             </fieldset>
//           </>
//         )}

//         <div className="btnGroup">
//           <button type="button" onClick={handlePrev} disabled={page == 0}>
//             Atras
//           </button>

//           {page !== lastPage && (
//             <button type="button" onClick={handleNext}>
//               Siguiente
//             </button>
//           )}

//           {page === lastPage && <button>Enviar</button>}
//         </div>
//       </form>
//     </div>
//   );
// }
