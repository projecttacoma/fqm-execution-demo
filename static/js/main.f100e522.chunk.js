(this["webpackJsonpfqm-execution-demo"]=this["webpackJsonpfqm-execution-demo"]||[]).push([[0],{1009:function(e,t,n){"use strict";n.r(t);var a=n(15),c=n(0),r=n.n(c),i=n(44),o=n.n(i),s=(n(207),n(71)),l=n(53),u=n(1053),j=n(1048),d=n(1059),h=n(1056),b=n(1046),O=n(1047),p=n(1042),m=Object(c.createContext)({outputType:"raw",setOutputType:function(){},measurementPeriodStart:new Date("1/1/2019"),setMeasurementPeriodStart:function(){},measurementPeriodEnd:new Date("12/31/2019"),setMeasurementPeriodEnd:function(){},calculationOptions:{calculateHTML:!1,calculateSDEs:!1},setCalculationOptions:function(){}}),f=function(e){var t=e.children,n=Object(c.useState)("raw"),r=Object(l.a)(n,2),i=r[0],o=r[1],s=Object(c.useState)(new Date("1/1/2019")),u=Object(l.a)(s,2),j=u[0],d=u[1],h=Object(c.useState)(new Date("12/31/2019")),b=Object(l.a)(h,2),O=b[0],p=b[1],f=Object(c.useState)({calculateHTML:!1,calculateSDEs:!1}),x=Object(l.a)(f,2),g=x[0],v=x[1];return Object(a.jsx)(m.Provider,{value:{outputType:i,setOutputType:o,measurementPeriodStart:j,setMeasurementPeriodStart:d,measurementPeriodEnd:O,setMeasurementPeriodEnd:p,calculationOptions:g,setCalculationOptions:v},children:t})};function x(){var e=Object(c.useContext)(m),t=e.outputType,n=e.setOutputType;return Object(a.jsx)(p.a,{component:"fieldset",children:Object(a.jsxs)(b.a,{name:"type",value:t,onChange:function(e){n(e.target.value)},children:[Object(a.jsx)(O.a,{control:Object(a.jsx)(h.a,{color:"primary"}),value:"rawResults",label:"Raw"}),Object(a.jsx)(O.a,{control:Object(a.jsx)(h.a,{color:"primary"}),value:"detailedResults",label:"Detailed"}),Object(a.jsx)(O.a,{control:Object(a.jsx)(h.a,{color:"primary"}),value:"measureReports",label:"Measure Reports"}),Object(a.jsx)(O.a,{control:Object(a.jsx)(h.a,{color:"primary"}),value:"gapsInCare",label:"Gaps In Care"})]})})}var g=n(141),v=n(1011),C=n(1058);function M(){var e=Object(c.useContext)(m),t=function(t){e.setCalculationOptions(Object(s.a)(Object(s.a)({},e.calculationOptions),{},Object(g.a)({},t.target.name,t.target.checked)))};return Object(a.jsxs)(v.a,{children:[Object(a.jsx)(O.a,{control:Object(a.jsx)(C.a,{checked:e.calculationOptions.calculateSDEs,onChange:t,name:"calculateSDEs",color:"primary"}),label:"Calculate SDEs"}),Object(a.jsx)(O.a,{control:Object(a.jsx)(C.a,{checked:e.calculationOptions.calculateHTML,onChange:t,name:"calculateHTML",color:"primary"}),label:"Calculate HTML"})]})}var P=n(198),w=n(57),D=n(1054);function R(){var e=Object(c.useContext)(m);return Object(a.jsx)(w.a,{utils:P.a,children:Object(a.jsx)(D.a,{value:e.measurementPeriodStart,format:"MM/dd/yyyy",onChange:e.setMeasurementPeriodStart})})}function S(){var e=Object(c.useContext)(m);return Object(a.jsx)(w.a,{utils:P.a,children:Object(a.jsx)(D.a,{value:e.measurementPeriodEnd,format:"MM/dd/yyyy",onChange:e.setMeasurementPeriodEnd})})}function y(){return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsxs)(u.a,{item:!0,xs:4,children:[Object(a.jsx)("h3",{children:"Output Type:"}),Object(a.jsx)(x,{})]}),Object(a.jsxs)(u.a,{item:!0,xs:4,children:[Object(a.jsx)("h3",{children:"Calculation Options:"}),Object(a.jsx)(M,{})]}),Object(a.jsxs)(u.a,{item:!0,xs:4,children:[Object(a.jsx)("h3",{children:"Measurement Start: "}),Object(a.jsx)(R,{}),Object(a.jsx)("h3",{children:"Measurement End: "}),Object(a.jsx)(S,{})]})]})}var F=n(835),N=n(199),E=n(837),I=Object(c.createContext)({onMeasureUpload:function(e,t,n){return null},onPatientUpload:function(e,t,n){return null},measureFileName:null,setMeasureFileName:function(e){return null},patientFileName:null,setPatientFileName:function(e){return null},onMeasureDropdownChange:function(e){return null},onECQMMeasureDropdownChange:function(e){return null},onPatientDropdownChange:function(e){return null},onECQMPatientDropdownChange:function(e){return null},onFHIRPatientDropdownChange:function(e){return null},measureOptions:[],ecqmMeasureOptions:[],patientOptions:[],ecqmPatientOptions:[],fhirPatientOptions:[],setECQMPatientOptions:null,setPatientOptions:null,setFHIRPatientOptions:null,measureBundle:null,patientBundle:null,setMeasureBundle:function(){},setPatientBundle:function(){},fhirName:null,setFHIRName:null}),k=function(e){var t=e.children,n=Object(c.useState)(null),r=Object(l.a)(n,2),i=r[0],o=r[1],s=Object(c.useState)(null),u=Object(l.a)(s,2),j=u[0],d=u[1],h=Object(c.useState)(null),b=Object(l.a)(h,2),O=b[0],p=b[1],m=Object(c.useState)(null),f=Object(l.a)(m,2),x=f[0],g=f[1],v=Object(c.useState)([]),C=Object(l.a)(v,2),M=C[0],P=C[1],w=Object(c.useState)([]),D=Object(l.a)(w,2),R=D[0],S=D[1],y=Object(c.useState)([]),F=Object(l.a)(y,2),N=F[0],E=F[1],k=Object(c.useState)([]),T=Object(l.a)(k,2),B=T[0],H=T[1],q=Object(c.useState)([]),L=Object(l.a)(q,2),A=L[0],Q=L[1],G=Object(c.useState)(),U=Object(l.a)(G,2),J=U[0],z=U[1],W=Object(c.useCallback)((function(e){var t=e[0],n=new FileReader;n.onload=function(){p(t.path),o(JSON.parse(n.result))},n.readAsText(t)}),[]),X=Object(c.useCallback)((function(e){var t=e[0],n=new FileReader;n.onload=function(){g(t.path),d([JSON.parse(n.result)])},n.readAsText(t)}),[]);return Object(c.useEffect)((function(){fetch("https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure").then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return e.name}));return P(t),fetch("https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure")})).then((function(e){if(403===e.status){if(null!=e.headers.get("X-RateLimit-Reset")){var t=new Date(1e3*parseInt(e.headers.get("X-RateLimit-Reset")));throw new Error("GitHub Rate Limited until: ".concat(t))}throw new Error("Auth error with GitHub.")}return e.json()})).then((function(e){var t=e.map((function(e){return e.name}));S(t)})).catch((function(e){console.error("Error fetching from GitHub",e)}))}),[]),Object(a.jsx)(I.Provider,{value:{onMeasureUpload:W,onPatientUpload:X,measureFileName:O,patientFileName:x,setPatientFileName:g,setMeasureFileName:p,onMeasureDropdownChange:function(e){var t=e.target.value;fetch("https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/"+t+"/"+t+"-bundle.json").then((function(e){return e.json()})).then((function(e){return p(t),z("".concat(null===t||void 0===t?void 0:t.slice(0,3),"_").concat(null===t||void 0===t?void 0:t.slice(3))),o(e),fetch("https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure/".concat(t,"/").concat(t,"-files"))})).then((function(e){return e.json()})).then((function(e){var n=e.map((function(e){return e.name})).filter((function(e){return e.startsWith("tests")}));return E(n),H([]),fetch("https://api.github.com/repos/projecttacoma/fhir-patient-generator/contents/".concat(null===t||void 0===t?void 0:t.slice(0,3),"_").concat(null===t||void 0===t?void 0:t.slice(3),"/patients-r4"))})).then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return"denominator"===e.name||"numerator"===e.name||"ipop"===e.name||"none"===e.name?e.name:null}));Q(t)})).catch((function(e){return console.log("error: ",e)}))},onECQMMeasureDropdownChange:function(e){var t=e.target.value;fetch("https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/"+t+"/"+t+"-bundle.json").then((function(e){return e.json()})).then((function(e){return p(t),o(e),fetch("https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure/".concat(t,"/").concat(t,"-files"))})).then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return e.name})).filter((function(e){return e.startsWith("tests")}));H(t)})).catch((function(e){return console.log("error: ",e)}))},onPatientDropdownChange:function(e){var t=e.target.value;fetch("https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/".concat(O,"/").concat(O,"-files/").concat(t)).then((function(e){return e.json()})).then((function(e){d([e]),g(t)}))},onECQMPatientDropdownChange:function(e){var t=e.target.value;fetch("https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/".concat(O,"/").concat(O,"-files/").concat(t)).then((function(e){return e.json()})).then((function(e){d(e),g(t)}))},onFHIRPatientDropdownChange:function(e){var t=e.target.value,n=[];fetch("https://api.github.com/repos/projecttacoma/fhir-patient-generator/contents/".concat(J,"/patients-r4/").concat(t)).then((function(e){return e.json()})).then((function(e){var a=e.map((function(e){return e.path}));Promise.all(a.map((function(e){return fetch("https://raw.githubusercontent.com/projecttacoma/fhir-patient-generator/master/".concat(e)).then((function(e){return e.json()})).then((function(e){n.push(e)}))}))),d(n),g(t)}))},measureOptions:M,ecqmMeasureOptions:R,patientOptions:N,ecqmPatientOptions:B,fhirPatientOptions:A,setECQMPatientOptions:H,setPatientOptions:E,setFHIRPatientOptions:Q,measureBundle:i,patientBundle:j,setMeasureBundle:o,setPatientBundle:d,fhirName:J,setFHIRName:z},children:t})};function T(){var e=Object(F.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: ",";\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #7f7f7f;\n  outline: none;\n  transition: border 0.24s ease-in-out;\n"]);return T=function(){return e},e}var B=E.a.div(T(),(function(e){return function(e){return e.isDragAccept?"#00e676":e.isDragReject?"#ff1744":e.isDragActive?"#2196f3":"#eeeeee"}(e)})),H=function(){var e=Object(c.useContext)(I).onMeasureUpload,t=Object(N.a)({onDrop:e,accept:".json"}),n=t.getRootProps,r=t.getInputProps,i=t.isDragActive,o=t.isDragAccept,l=t.isDragReject;return Object(a.jsx)(u.a,{item:!0,xs:12,children:Object(a.jsxs)(B,Object(s.a)(Object(s.a)({},n({className:"dropzone",isDragActive:i,isDragAccept:o,isDragReject:l})),{},{children:[Object(a.jsx)("input",Object(s.a)({},r())),Object(a.jsx)("p",{children:"Drag and drop file here, or click to select file"})]}))})},q=function(){var e=Object(c.useContext)(I).onPatientUpload,t=Object(N.a)({onDrop:e,accept:".json"}),n=t.getRootProps,r=t.getInputProps,i=t.isDragActive,o=t.isDragAccept,l=t.isDragReject;return Object(a.jsx)(u.a,{item:!0,xs:12,children:Object(a.jsxs)(B,Object(s.a)(Object(s.a)({},n({className:"dropzone",isDragActive:i,isDragAccept:o,isDragReject:l})),{},{children:[Object(a.jsx)("input",Object(s.a)({},r())),Object(a.jsx)("p",{children:"Drag and drop file here, or click to select file"})]}))})},L=n(1055),A=n(1062),Q=Object(j.a)((function(e){return Object(d.a)({root:{width:"100%"}})}));function G(){var e=Q(),t=Object(c.useContext)(I),n=t.measureFileName,r=t.onMeasureDropdownChange,i=t.measureOptions;return Object(a.jsx)("div",{style:{width:"100%"},children:Object(a.jsx)(p.a,{className:e.root,children:Object(a.jsx)(L.a,{value:n||"",onChange:r,children:i.map((function(e){return Object(a.jsx)(A.a,{value:e,children:e},e)}))})})})}function U(){var e=Q(),t=Object(c.useContext)(I),n=t.measureFileName,r=t.onECQMMeasureDropdownChange,i=t.ecqmMeasureOptions;return Object(a.jsx)("div",{style:{width:"100%"},children:Object(a.jsx)(p.a,{className:e.root,children:Object(a.jsx)(L.a,{value:n||"",onChange:r,children:i.map((function(e){return Object(a.jsx)(A.a,{value:e,children:e},e)}))})})})}function J(){var e=Q(),t=Object(c.useContext)(I),n=t.patientFileName,r=t.onPatientDropdownChange,i=t.patientOptions;return Object(a.jsx)("div",{style:{width:"100%"},children:Object(a.jsx)(p.a,{className:e.root,children:Object(a.jsx)(L.a,{value:n||"",onChange:r,children:i.map((function(e){return Object(a.jsx)(A.a,{value:e,children:e},e)}))})})})}function z(){var e=Q(),t=Object(c.useContext)(I),n=t.patientFileName,r=t.onECQMPatientDropdownChange,i=t.ecqmPatientOptions;return Object(a.jsx)("div",{style:{width:"100%"},children:Object(a.jsx)(p.a,{className:e.root,children:Object(a.jsx)(L.a,{value:n||"",onChange:r,children:i.map((function(e){return Object(a.jsx)(A.a,{value:e,children:e},e)}))})})})}function W(){var e=Q(),t=Object(c.useContext)(I),n=t.patientFileName,r=t.onFHIRPatientDropdownChange,i=t.fhirPatientOptions;return Object(a.jsx)("div",{style:{width:"100%"},children:Object(a.jsx)(p.a,{className:e.root,children:Object(a.jsx)(L.a,{value:n||"",onChange:r,children:i.map((function(e){return Object(a.jsx)(A.a,{value:e,children:e},e)}))})})})}var X=n(1013),_=n(197),K=n.n(_),V=Object(j.a)((function(e){return Object(d.a)({root:{color:"#3f51b5"}})}));function Y(){var e=V(),t=Object(c.useContext)(I),n=t.measureFileName,i=t.patientFileName,o=t.setPatientFileName,s=t.setMeasureFileName,l=t.setPatientOptions,j=t.setECQMPatientOptions;return Object(a.jsxs)(r.a.Fragment,{children:[Object(a.jsxs)(u.a,{item:!0,xs:6,children:[Object(a.jsx)("h2",{children:"Measure Bundle: "}),null!==n&&Object(a.jsx)("h3",{children:"Current Measure Bundle:"}),null!==n&&Object(a.jsxs)(u.a,{container:!0,children:[Object(a.jsxs)("h3",{className:e.root,children:[" ",n]})," ",null!==n&&Object(a.jsx)(X.a,{"aria-label":"delete",onClick:function(){s(null),l([]),j([]),o(null)},children:Object(a.jsx)(K.a,{})})]}),Object(a.jsx)("h4",{children:"Upload From File System:"}),Object(a.jsx)(H,{}),Object(a.jsx)("h4",{children:"OR Select From Connectathon Repository:"}),Object(a.jsx)(G,{}),Object(a.jsx)("h4",{children:"OR Select From eCQM Measure Content Repository:"}),Object(a.jsx)(U,{})]}),Object(a.jsxs)(u.a,{item:!0,xs:6,children:[Object(a.jsx)("h2",{children:"Patient Bundle: "}),null!==i&&Object(a.jsx)("h3",{children:"Current Patient Bundle:"}),null!==i&&Object(a.jsxs)(u.a,{container:!0,children:[Object(a.jsxs)("h3",{className:e.root,children:[" ",i]})," ",null!==i&&Object(a.jsx)(X.a,{"aria-label":"delete",onClick:function(){o(null)},children:Object(a.jsx)(K.a,{})})]}),Object(a.jsx)("h4",{children:"Upload From File System:"}),Object(a.jsx)(q,{}),Object(a.jsx)("h4",{children:"OR Select From Connectathon Repository:"}),Object(a.jsx)(J,{}),Object(a.jsx)("h4",{children:"OR Select From FHIR Patient Generator Repository:"}),Object(a.jsx)(W,{}),Object(a.jsx)("h4",{children:"OR Select From eCQM Measure Content Repository:"}),Object(a.jsx)(z,{})]})]})}var Z=n(1050),$=n(124),ee=n(841),te=n.n(ee),ne=n(842),ae=n.n(ne),ce=n(843),re=n.n(ce),ie=Object(j.a)((function(e){return Object(d.a)({root:{display:"flex-grow",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},formControl:{margin:e.spacing(1)},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},container:{display:"flex-grow"},highlightedMarkup:{"& pre":{whiteSpace:"pre-wrap"}}})}));function oe(){var e=ie(),t=Object(c.useState)(null),n=Object(l.a)(t,2),r=n[0],i=n[1],o=Object(c.useState)([]),j=Object(l.a)(o,2),d=j[0],h=j[1],b=Object(c.useContext)(m),O=b.outputType,p=b.measurementPeriodStart,f=b.setMeasurementPeriodStart,x=b.measurementPeriodEnd,g=b.setMeasurementPeriodEnd,v=b.calculationOptions,C=b.setCalculationOptions,M=Object(c.useContext)(I),P=M.measureFileName,w=M.setPatientFileName,D=M.setMeasureFileName,R=M.measureBundle,S=M.patientBundle,F=M.setMeasureBundle,N=M.setPatientBundle;return Object(a.jsx)("div",{className:e.root,children:Object(a.jsxs)(u.a,{children:[Object(a.jsx)("h1",{id:"header",children:"FQM Execution Demo"}),Object(a.jsx)(u.a,{container:!0,justify:"space-evenly",children:Object(a.jsx)(u.a,{container:!0,item:!0,xs:11,spacing:2,alignItems:"center",children:Object(a.jsx)(Y,{})})}),Object(a.jsx)(u.a,{container:!0,spacing:1,justify:"space-evenly",children:Object(a.jsx)(u.a,{container:!0,item:!0,xs:11,spacing:2,children:Object(a.jsx)(y,{})})}),Object(a.jsxs)(u.a,{container:!0,justify:"flex-end",children:[Object(a.jsx)(Z.a,{variant:"contained",onClick:function(){D(null),w(null),F(null),N(null),f(new Date("1/1/2019")),g(new Date("12/31/2019")),C({calculateHTML:!1,calculateSDEs:!1}),i(null),h([])},children:"Reset"}),Object(a.jsx)(Z.a,{variant:"contained",color:"primary",onClick:function(){var e=Object(s.a)({measurementPeriodStart:null===p||void 0===p?void 0:p.toISOString(),measurementPeriodEnd:null===x||void 0===x?void 0:x.toISOString()},v);if("rawResults"===O)i($.Calculator.calculateRaw(R,S,e));else if("detailedResults"===O){var t=$.Calculator.calculate(R,S,e);i(t);var n=[];if(null!==t&&!0===v.calculateHTML){var a;for(a in t.results[0].detailedResults)void 0!==t.results[0].detailedResults&&n.push({groupId:t.results[0].detailedResults[a].groupId,html:t.results[0].detailedResults[a].html});h(n)}else h([])}else if("measureReports"===O){var c=$.Calculator.calculateMeasureReports(R,S,e),r=c.results;if(e.calculateHTML){var o=r.map((function(e){var t;return{groupId:e.id||"",html:(null===(t=e.text)||void 0===t?void 0:t.div)||""}}));h(o)}i(c)}else"gapsInCare"===O&&i($.Calculator.calculateGapsInCare(R,S,e))},children:"Calculate"})]}),Object(a.jsxs)(u.a,{container:!0,children:[Object(a.jsx)(u.a,{container:!0,item:!0,xs:6,direction:"row",children:Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Results:"}),r&&Object(a.jsx)(te.a,{src:r,enableClipboard:!0,theme:"shapeshifter:inverted",collapsed:2}),r&&Object(a.jsx)(Z.a,{variant:"contained",color:"primary",onClick:function(){re()(JSON.stringify(r),(null===P||void 0===P?void 0:P.includes(".json"))?"results-".concat(P):"results-".concat(P,".json"))},children:"Download"})]})}),Object(a.jsx)(u.a,{container:!0,item:!0,xs:6,direction:"row",children:d&&d.map((function(t){return Object(a.jsxs)("div",{className:e.highlightedMarkup,children:[Object(a.jsx)("h2",{children:"HTML:"}),ae()(t.html)]},t.groupId)}))})]})]})})}var se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1064)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(f,{children:Object(a.jsx)(k,{children:Object(a.jsx)(oe,{})})})}),document.getElementById("root")),se()},207:function(e,t,n){},948:function(e,t){},950:function(e,t){}},[[1009,1,2]]]);
//# sourceMappingURL=main.f100e522.chunk.js.map