# Customer_Registration_System
Sistema de cadastro de clientes, apto a fazer os registro de clientes de uma empresa. Registros que poderão ser criados, atualizados e deletados do sistema e do banco de dados.

<h2>Descrição da Aplicação</h2>
<ol>
<li>O sistema construido possue uma verificação de acesso em que apenas usuarios administradores poderao ter acesso a todas as rotas da aplicação. Caso algum usuário tente entrar na rota do sistema de cadastro dos clientes ou alguma outra rota protegida pela autenticação, será exibido na tela uma mensagem de erro(flash) informando que ele precisa fazer login para ter acesso aquela rota especifica.</li>

<li> Esse sistema possue, em sua rota principal, uma página responsável pelo login dos usuarios administradores na aplicação, o usuario que já possuir registro irá simplismente inserir o seu E-mail e password para entrar no sistema de cadastro, caso ele nao possua registro, ou seja, caso os seus dados pessoais nao estejam registrados no banco de dados da aplicação, será exibido um flash(mensagem de error) que aquele E-mail ainda nao foi cadastrado no nosso banco, logo, ele nao vai conseguir entrar no sistema de cadastro devido ao sistema de autenticação onde será necessário se cadastrar primeiramente, e após, ir fazer login. mas o E-mail e o password devem ser exatamente iguais aos registrados pelo usuario na rota de registro de usuarios, caso constário, a autenticação do sistema irá exibir os erros.</li>

<li>A rota de registro de usuario possue um sistema de verificaão de cada dado inserido nos seus campos, cujos dados correspondem aos registros dos usuarios, onde, caso o usuaro tente fazer seu registro com um E-mail que já esteja no banco de dados, será exibido um erro informando que ele deve fazer login, haja vista que aquele E-mail já existe. No formulário de registro, entao, Além ter essa verificação dos E-mails, também possue a necessidade de que todos os outros campos devem ser preenchidos devidamentes, caso contrário, será exibido a mesagem de error.</li>

<li>Após o usuarios se registrar no banco de dados da apliação e fazer o seu login, ele irá entrar no sistema de cadastr0, o chamado CRUD, onde ele poderá criar, registrar os seus crientes no seu banco de dados específico, poderá autera-los modificando os seus dados, além de poder deleta-los quando necessário, para isso o usuario possue um formulário especifico para o registro dos clientes, onde será preenchido com os dados esperados em cada campo do formulário.</li>

<li> Quando o usuário estiver logado na aplicação, ou seja, quando eleestiver na rota de cadatro de clientes, ele poderá clicar no botão de fazer logOut para assim deslogar e sair. Esse botão so é exibido quando o usuario estiver logado no sistema, quando ele sair, o botão desaparece.

<li>Entre outras funcionalidades da aplicação, ela se destaca por ser segura, devido ao seu sistema de autentcação, de verificação das senhas hasheadas por meio o bcrypt registradas no banco, devido a verificação de cada usuario, para que os clientes possame serem cadastrados e seus dados protegidos.</li>
</ol>


<h3>Ferramentas utilizadas</h3>
<ul> 
  <li>JAVASCRIPT !</li>
  <li>NODEJS !</li>
  <li>Template Engine HANDLEBARS !</li>
  <li>SASS | CSS !</li>
  <li>PASSPORT para autenticação !</li>
  <li>BCRYPTJS para hashear as senhas e autentica-las !</li>
</ul>
<hr>
<ul> 
<li>O bryptjs será o responsável por hashear as senhas e nao permitir que elas possam serem salvas do mesmo modo como os usuarios inserem no formulário de registro. logo, uma senha hasheada nao tem a possibilidade de ser quebrada, garantindo uma melhor segurança aos usuarios.</li>
<li>O bcrypt também irá compara as senhas, como a senha registrada e a senha inserida pelo usuário no formulário de login, caso essas duas senhas seja iguais, o usuario está autenticado permitindo o seu acesso ao sistema de cadatro de clientes - CRUD.</li>
<li>Juntamente com o bcrypt, foi utilizado a bblioteca PASSPORT, capaz de autenticar o usuario que esteja registrado no banco de dados.
</ul>

<h2>Preview</h2>
<li>Página de Login, o usuário precisará ter se registrado primeiro para fazer login_:</li>

![Captura de Tela (109)](https://user-images.githubusercontent.com/119543591/214090931-4e4998a8-888d-4fa7-807e-6c8f0acfedaa.png)

<li>Após o uruário fazer login, ele entrará no sistema de cadastro onde ele poderá criar/cadastrar os clientes_:</li>

![Captura de Tela (111)](https://user-images.githubusercontent.com/119543591/214091479-f0511e5d-3964-49a2-9e0c-a53c679dcf25.png)

<li>Entao, quando o usuario criar/cadastrar um cliente, será exibido amensagem de sucesso e abaixo os dados do cliente_:</li>

![Captura de Tela (112)](https://user-images.githubusercontent.com/119543591/214092742-054c869c-3710-4a16-8581-4166ac0b94c7.png)

<li>O usuário também tem a opção de deletar os clientes cadastrados na lista apertando no icone da lixeira, onde o cliente será deletado da lista e do banco de dados.</li>

<li>Além disso, o usuário também terá a opção de editar os dados dos clientes clicando no icone verde no lado dos seus dados, e quando ele clicar, ele será redirecionado para essa rota onde ele irá inserir os dados desejados, atualizando assim os dados do cliente_:</li>

![Captura de Tela (122)](https://user-images.githubusercontent.com/119543591/214094397-95cf095f-4e6e-42f1-82f8-d3c7c1a4493c.png)

<li>Após ele editar os dados do cliente, ele ira ser redirecionado para o sistema de cadastro(CRUD), onde será exibido uma mensagem de sucesso e os dados atualizados serão exibidos. Os dados são atualizados tanto na lista quanto no proprio banco de dados_:</li>



<hr>

<li>Mas se, ao tentar logar na aplicação,o usuario nao tiver feito antes nenhum registro, ele nao poderar entrar no sistema de cadastro, sendo obrigatório fazer registro no formulário de registro, onde ele vai inserir os dados necessários_:</li>

![Captura de Tela (116)](https://user-images.githubusercontent.com/119543591/214096969-58bbdcb7-6bf2-4cf2-824c-9aaee4b9103b.png)

<li>Após fazer o registro dos seus dados, ele ira ser redirecionado para essa rota, onde ele irá clicar no link para fazer login, e após, ele poderá entao fazer o login e assim entar no sistema de cadastro_:</li>







