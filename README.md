# fqm-execution-demo

This is a React app that demonstrates the capabilities of the [fqm-execution](https://github.com/projecttacoma/fqm-execution) library in calculating FHIR-based electronic Clinical Quality Measures (eCQMs).

## Hosted Version

This app is hosted on GitHub Pages, at [https://projecttacoma.github.io/fqm-execution-demo/](https://projecttacoma.github.io/fqm-execution-demo/), for demonstration use without standing up a local development environment.

## Options/fields

### Measure Bundle

In order to run calculation, the demo app requires a `Bundle` resource that includes the `Measure` resource, all required `Library` resources, and all required `ValueSet` resources. Users can provide measure bundles in three different ways:

- By uploading a measure bundle from their local computer, by clicking on the box below `Upload From File System` or dragging a bundle from their file browser to that box.
- By selecting a measure bundle from the `Select From Connectathon Repository` dropdown list, which is populated with the measure bundles from the [DBCG/connectathon](https://github.com/dbcg/connectathon) repository.
- By selecting a measure bundle from the `Select From eCQM Measure Content Repository` dropdown, which is populated from the [cqframework/ecqm-content-r4](https://github.com/cqframework/ecqm-content-r4) repository.

### Patient Bundle

In order to run calculation, the demo app requires a `Bundle` resource that includes the `Patient` resource, and all other required clinical resources (`Procedure`s, `Encounter`s, etc.). Users can provide patient bundles in four different ways:

- By uploading a patient bundle from their local computer, by clicking on the box below `Upload From File System` or dragging a bundle from their file browser to that box.
- By selecting a patient bundle from the `Select From Connectathon Repository` dropdown list, which is populated from the [DBCG/connectathon](https://github.com/dbcg/connectathon) repository if a matching measure is selected in the `Measure Bundle` field.
- By selecting a patient bundle from the `Select From FHIR Patient Generator Repository` dropdown list, which is populated from the [projecttacoma/fhir-patient-generator] repository if a matching measure is selected in the `Measure Bundle` field.
- By selecting a patient bundle from the `Select From eCQM Measure Content Repository` dropdown, which is populated from the [cqframework/ecqm-content-r4](https://github.com/cqframework/ecqm-content-r4) repository if a matching measure is selected in the `Measure Bundle` field.

### Output type

This field selects the type of output from `fqm-execution`'s calculation engine:

- `Raw`: the raw results of executing the patient data against the provided ELM in the measure bundle.
- `Detailed`: detailed results from the calculation engine, including results for each measure population for the patient.
- `Measure Reports`: A FHIR `MeasureReport` object containing the calculation results, as well as the evaluated resources.
- `Gaps In Care`: A report detailing the gaps in care for a given patient (if any).

### Calculation Options

- `Calculate SDEs`: Check to enable calculation of "Supplemental Data Elements" for the provided patient/measure
- `Calculate HTML`: Check to enable generation of HTML output detailing the logic results for the provided patient/measure, including highlighting.

### Measurement Period

- `Measurement Start`: The first day of the `Measurement Period` used by the measure. Defaults to January 1, 2019.
- `Measurement End`: The last day of the `Measurement Period` used by the measure. Defaults to December 31, 2019.

## Local Development

To run `fqm-execution-demo` locally, you will need [Node.JS](https://nodejs.org/en/) installed on your system. `fqm-execution-demo` is tested with Node version `12`, but more recent versions may also work.

To install the prerequisites for development: in a terminal window open to the `fqm-execution-demo` base directory, run `npm install`.

To serve the app in development mode, run `npm start`. This will start a webserver that will compile the app and serve it locally on `http://localhost:3000/fqm-execution-demo`. This server will automatically re-compile the app when code in the `src` directory is changed.

To execute the test suite, run `npm test`. This will run all the unit tests, and will "watch" the `src/` directory and re-run the test suite when the source code changes. Press `q` to quit the test watcher.

To execute code style checking, run `npm run prettier`. This will check the style of all code in `src/` against the specified styles for the project. To autofix any automatically fixable issues, run `npm run prettier:fix`.

## License

Copyright 2020 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
