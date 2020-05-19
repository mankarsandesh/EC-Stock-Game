export default function(context) {
  let isMaintenance = !!process.env.MAINTENANCE_MODE;
  if (isMaintenance) {
    return context.redirect('/maintenance');
  }
  return;
}
