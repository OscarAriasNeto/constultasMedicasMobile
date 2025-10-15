# Solução para erro ao criar Pull Request

Caso encontre a mensagem `Failed to create pull request, Please try again`:

1. Confirme que o branch local foi enviado ao remoto:
   ```bash
   git status
   git remote -v
   git push origin <nome-do-branch>
   ```
2. Atualize a autenticação do GitHub (caso esteja usando GitHub CLI):
   ```bash
   gh auth refresh -h github.com
   ```
3. Tente criar a PR novamente pela CLI:
   ```bash
   gh pr create --base main --head <nome-do-branch> --fill
   ```
4. Se o erro persistir, limpe os cookies e tente novamente pelo navegador.
