### User Input

Crea un nuevo type en /types con las siguientes propiedades:
- Ticket:  id: number, title: string, description: string, status: OPEN | IN_PROGRESS | RESOLVED | 
REJECTED, priority: High | Medium | Low, createdAt: date, updatedAt: Date, userId: number (será el usuario que crrea el ticket), assignedTo: number (será el usuario al que se le asigna responder el ticket)
- TicketCreate: Usa type utility para tener solo las siguientes propiedades: title: string, description: string, status: OPEN | IN_PROGRESS | RESOLVED | 
REJECTED, priority: High | Medium | Low, createdAt: date, updatedAt: Date, userId: number (será el usuario que crrea el ticket), assignedTo: number (será el usuario al que se le asigna responder el ticket)
- TicketUpdate: Usa type utility para tener solo las siguientes propiedades: id: number, title: string, description: string, status: OPEN | IN_PROGRESS | RESOLVED | 
REJECTED, priority: High | Medium | Low, createdAt: date, updatedAt: Date, userId: number (será el usuario que crrea el ticket), assignedTo: number (será el usuario al que se le asigna responder el ticket)

*Edited relevant file*

*Edited relevant file*

### Planner Response

He creado el archivo `src/app/types/ticket.type.ts` y actualizado el barril de tipos:

1.  **`Ticket`**: Define la estructura completa incluyendo `id`, estados (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `REJECTED`), prioridades (`High`, `Medium`, `Low`), fechas y las relaciones por ID de usuario.
2.  **`TicketCreate`**: Utiliza `Omit` para excluir la propiedad `id` de `Ticket`.
3.  **`TicketUpdate`**: Incluye todas las propiedades de `Ticket` para permitir actualizaciones completas por ID.

Puedes encontrar las definiciones en [ticket.type.ts](file:///c:/Users/mcastillo/Documents/prueba-angular/src/app/types/ticket.type.ts).
