As a user, I would like to be able to manage my projects and create, update or delete them.
Scope:
Plan and implement all three features in the app (create project, update project, delete project)
Handle input validation and errors
Add test coverage

1. Listing all projects (already done)
2. Create a new project
3. Update a project
4. Delete a project (soft delete?)
5. Input frontend validation and error handling
   5.1 New reusable component: Form (simplified)
   5.1.1: Reusable TextField/TextArea component (input)
   5.1.2: Reusable Dropdown (selector) component
   5.2 RHF for forms (simplified)
   5.3 Zod for validation (simplified)
   5.3.1 Schema ProjectFormSchema (for create and update)
   5.3.2 infer<interface Project>
   5.4 Error and Status: Loading states and Error States and rendering them.
6. Test coverage:
   6.1 Unit
   6.1.1. Form
   6.2 E2E
   6.2.1 Project listing
   6.2.2 Project create
   6.2.3 Project update
   6.2.4 Project delete

Steps implementation:

1. Install deps RHF, Zod
2. Create components: TextField, Dropdown, Form (Controllable?) (name, desc, createdAt (?), updatedAt (?), inspirations)
3. Create a project:
   3.1 Services\projects.ts
   3.2 api: baseUrl, caching settings... > TanStack React Query (server state) / RTK Query /
   3.3 Global App State? Redux, Zustand or anything, React Context. User preferences (dark / light mode)
   3.4 api.Projects.createProject: @params: {input} POST > updateDB > return 200 OK
   3.5 api.Projects.updateProject POST {inputOfUpdate, id} >
   3.6 api.Projects.deleteProject POST (soft) DELETE {id} > 200
   3.7 api.Projects.getAllProjects GET / POST {()} => Project[]
   3.8
4. a11y:
   4.1 Requirements: 1, 2, 3 > level 2
   4.2 Tooling: chrome ext > scans > results. Libraries
   4.3 Testing
