### Utilização de contexto e hook
Criar o contexto (exportar o context e o context provider)</br>
    - O context provider será utilizado no App (nas rotas que irão utilizar o contexto). eg.:</br>
      <pre>
      <code>
      ```
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
      ```
      </code>
      </pre>
    - O context será utilizado no hook. eg.:
    <pre>
      ```javascript
      export function useAuth() {
        return useContext(AuthContext);
      }
            ```
      </pre>
    Como boa prática, não utilizar o contexto direto no componente e sim no hook.