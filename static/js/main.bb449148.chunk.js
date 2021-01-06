(this["webpackJsonpfqm-execution-demo"]=this["webpackJsonpfqm-execution-demo"]||[]).push([[0],{189:function(e,t,a){},925:function(e,t){},927:function(e,t){},986:function(e,t,a){"use strict";a.r(t);var n=a(21),c=a(0),l=a.n(c),r=a(47),s=a.n(r),i=(a(189),a(80)),o=a(72),u=a(1024),j=a(1022),d=a(1028),O=a(1026),b=a(1031),p=a(1021),h=a(1029);function x(e){return Object(n.jsx)(h.a,{component:"fieldset",children:Object(n.jsxs)(b.a,{name:"type",value:e.outputType,onChange:function(t){e.setOutputType(t.target.value)},children:[Object(n.jsx)(p.a,{control:Object(n.jsx)(O.a,{color:"primary"}),value:"rawResults",label:"Raw"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(O.a,{color:"primary"}),value:"detailedResults",label:"Detailed"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(O.a,{color:"primary"}),value:"measureReports",label:"Measure Reports"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(O.a,{color:"primary"}),value:"gapsInCare",label:"Gaps In Care"})]})})}var m=a(130),g=a(1020),f=a(1027);function v(e){var t=function(t){e.setCalculationOptions(Object(i.a)(Object(i.a)({},e.calculationOptions),{},Object(m.a)({},t.target.name,t.target.checked)))};return Object(n.jsxs)(g.a,{children:[Object(n.jsx)(p.a,{control:Object(n.jsx)(f.a,{checked:e.calculationOptions.includeClauseResults,onChange:t,name:"includeClauseResults",color:"primary"}),label:"Include Clause Results"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(f.a,{checked:e.calculationOptions.includePrettyResults,onChange:t,name:"includePrettyResults",color:"primary"}),label:"Include Pretty Results"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(f.a,{checked:e.calculationOptions.includeHighlighting,onChange:t,name:"includeHighlighting",color:"primary"}),label:"Include Highlighting"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(f.a,{checked:e.calculationOptions.calculateSDEs,onChange:t,name:"calculateSDEs",color:"primary"}),label:"Calculate SDEs"}),Object(n.jsx)(p.a,{control:Object(n.jsx)(f.a,{checked:e.calculationOptions.calculateHTML,onChange:t,name:"calculateHTML",color:"primary"}),label:"Calculate HTML"})]})}var y=a(825),C=a(55),D=a(1025);function R(e){return Object(n.jsx)(C.a,{utils:y.a,children:Object(n.jsx)(D.a,{value:e.measurementPeriodDate,format:"MM/dd/yyyy",onChange:e.setMeasurementPeriodDate})})}function S(e){return Object(n.jsxs)(l.a.Fragment,{children:[Object(n.jsxs)(u.a,{item:!0,xs:4,children:[Object(n.jsx)("h3",{children:"Output Type:"}),Object(n.jsx)(x,{setOutputType:e.setOutputType,outputType:e.outputType})]}),Object(n.jsxs)(u.a,{item:!0,xs:4,children:[Object(n.jsx)("h3",{children:"Calculation Options:"}),Object(n.jsx)(v,{setCalculationOptions:e.setCalculationOptions,calculationOptions:e.calculationOptions})]}),Object(n.jsxs)(u.a,{item:!0,xs:4,children:[Object(n.jsx)("h3",{children:"Measurement Start: "}),Object(n.jsx)(R,{setMeasurementPeriodDate:e.setMeasurementPeriodStart,measurementPeriodDate:e.measurementPeriodStart}),Object(n.jsx)("h3",{children:"Measurement End: "}),Object(n.jsx)(R,{setMeasurementPeriodDate:e.setMeasurementPeriodEnd,measurementPeriodDate:e.measurementPeriodEnd})]})]})}var P=a(817),M=a(826),w=a(819);function T(){var e=Object(P.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: ",";\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #7f7f7f;\n  outline: none;\n  transition: border 0.24s ease-in-out;\n"]);return T=function(){return e},e}var I=w.a.div(T(),(function(e){return function(e){return e.isDragAccept?"#00e676":e.isDragReject?"#ff1744":e.isDragActive?"#2196f3":"#eeeeee"}(e)})),k=function(e){var t=e.onDrop,a=Object(M.a)({onDrop:t,accept:".json"}),c=a.getRootProps,l=a.getInputProps,r=a.isDragActive,s=a.isDragAccept,o=a.isDragReject;return Object(n.jsx)(u.a,{item:!0,xs:12,children:Object(n.jsxs)(I,Object(i.a)(Object(i.a)({},c({className:"dropzone",isDragActive:r,isDragAccept:s,isDragReject:o})),{},{children:[Object(n.jsx)("input",Object(i.a)({},l())),Object(n.jsx)("p",{children:"Drag and drop file here, or click to select file"})]}))})};function F(e){return Object(n.jsxs)(l.a.Fragment,{children:[Object(n.jsxs)(u.a,{item:!0,xs:6,children:[Object(n.jsx)("h2",{children:"Measure Bundle: "}),Object(n.jsx)("h3",{children:e.measureFileName}),null===e.measureFileName&&Object(n.jsx)(k,{onDrop:e.onMeasureUpload})]}),Object(n.jsxs)(u.a,{item:!0,xs:6,children:[Object(n.jsx)("h2",{children:"Patient Bundle: "}),Object(n.jsx)("h3",{children:e.patientFileName}),null===e.patientFileName&&Object(n.jsx)(k,{onDrop:e.onPatientUpload})]})]})}var E=a(1023),H=a(114),N=a(823),L=a.n(N),A=a(824),B=a.n(A),J=Object(j.a)((function(e){return Object(d.a)({root:{display:"flex-grow",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}},formControl:{margin:e.spacing(1)},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:200},container:{display:"flex-grow"},highlightedMarkup:{"& pre":{whiteSpace:"pre-wrap"}}})}));function U(){var e=J(),t=Object(c.useState)(null),a=Object(o.a)(t,2),l=a[0],r=a[1],s=Object(c.useState)(null),j=Object(o.a)(s,2),d=j[0],O=j[1],b=Object(c.useState)(null),p=Object(o.a)(b,2),h=p[0],x=p[1],m=Object(c.useState)([]),g=Object(o.a)(m,2),f=g[0],v=g[1],y=Object(c.useState)(null),C=Object(o.a)(y,2),D=C[0],R=C[1],P=Object(c.useState)(null),M=Object(o.a)(P,2),w=M[0],T=M[1],I=Object(c.useCallback)((function(e){var t=e[0],a=new FileReader;a.onload=function(){r(t.path),R(JSON.parse(a.result))},a.readAsText(t)}),[]),k=Object(c.useCallback)((function(e){var t=e[0],a=new FileReader;a.onload=function(){O(t.path),T(JSON.parse(a.result))},a.readAsText(t)}),[]),N=Object(c.useState)("raw"),A=Object(o.a)(N,2),U=A[0],q=A[1],G=Object(c.useState)(new Date("1/1/2019")),z=Object(o.a)(G,2),Q=z[0],K=z[1],V=Object(c.useState)(new Date("12/31/2019")),W=Object(o.a)(V,2),X=W[0],Y=W[1],Z=Object(c.useState)({calculateHTML:!1,calculateSDEs:!1,includeClauseResults:!1,includeHighlighting:!1,includePrettyResults:!1}),$=Object(o.a)(Z,2),_=$[0],ee=$[1];return Object(n.jsx)("div",{className:e.root,children:Object(n.jsxs)(u.a,{children:[Object(n.jsx)("h1",{id:"header",children:"FQM Execution Demo"}),Object(n.jsx)(u.a,{container:!0,justify:"space-evenly",children:Object(n.jsx)(u.a,{container:!0,item:!0,xs:11,spacing:2,alignItems:"center",children:Object(n.jsx)(F,{onMeasureUpload:I,onPatientUpload:k,measureFileName:l,patientFileName:d})})}),Object(n.jsx)(u.a,{container:!0,spacing:1,justify:"space-evenly",children:Object(n.jsx)(u.a,{container:!0,item:!0,xs:11,spacing:2,children:Object(n.jsx)(S,{setOutputType:q,outputType:U,setMeasurementPeriodStart:K,measurementPeriodStart:Q,setMeasurementPeriodEnd:Y,measurementPeriodEnd:X,setCalculationOptions:ee,calculationOptions:_})})}),Object(n.jsxs)(u.a,{container:!0,justify:"flex-end",children:[Object(n.jsx)(E.a,{variant:"contained",onClick:function(){r(null),O(null),R(null),T(null),K(new Date("1/1/2019")),Y(new Date("12/31/2019")),ee({calculateHTML:!1,calculateSDEs:!1,includeClauseResults:!1,includeHighlighting:!1,includePrettyResults:!1}),x(null),v([])},children:"Reset"}),Object(n.jsx)(E.a,{variant:"contained",color:"primary",onClick:function(){var e=Object(i.a)({measurementPeriodStart:null===Q||void 0===Q?void 0:Q.toISOString(),measurementPeriodEnd:null===X||void 0===X?void 0:X.toISOString()},_);if("rawResults"===U)x(H.Calculator.calculateRaw(D,[w],e));else if("detailedResults"===U){var t=H.Calculator.calculate(D,[w],e);x(t);var a=[];if(null!==t&&!0===_.calculateHTML){var n;for(n in t.results[0].detailedResults)void 0!==t.results[0].detailedResults&&a.push({groupId:t.results[0].detailedResults[n].groupId,html:t.results[0].detailedResults[n].html});v(a)}else v([])}else"measureReports"===U?x(H.Calculator.calculateMeasureReports(D,[w],e)):"gapsInCare"===U&&x(H.Calculator.calculateGapsInCare(D,[w],e))},children:"Calculate"})]}),Object(n.jsxs)(u.a,{container:!0,children:[Object(n.jsx)(u.a,{container:!0,item:!0,xs:6,direction:"row",children:Object(n.jsxs)("div",{children:[Object(n.jsx)("h2",{children:"Results:"}),h&&Object(n.jsx)(L.a,{src:h,enableClipboard:!0,theme:"shapeshifter:inverted",collapsed:2})]})}),Object(n.jsx)(u.a,{container:!0,item:!0,xs:6,direction:"row",children:f&&f.map((function(t){return Object(n.jsxs)("div",{className:e.highlightedMarkup,children:[Object(n.jsx)("h2",{children:"HTML:"}),B()(t.html)]},t.groupId)}))})]})]})})}var q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,1033)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,l=t.getLCP,r=t.getTTFB;a(e),n(e),c(e),l(e),r(e)}))};s.a.render(Object(n.jsx)(l.a.StrictMode,{children:Object(n.jsx)(U,{})}),document.getElementById("root")),q()}},[[986,1,2]]]);
//# sourceMappingURL=main.bb449148.chunk.js.map