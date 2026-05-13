using System;

namespace Api.Features.Home.GetWelcome.Configuration;

public class CarveryConfigurationNotFoundException(string message) : Exception(message) { }